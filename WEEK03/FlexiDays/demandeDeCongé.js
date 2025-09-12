const API_URL = "http://localhost:3000";
let editingId = null; // null = ajout, sinon = modification

// ✅ User par défaut (Sara)
localStorage.setItem("currentUser", JSON.stringify({
  employee: "Sara El Amrani",
  departement: "RH"
}));

// 📝 Soumission du formulaire
async function submitDemande(e) {
  e.preventDefault();

  const form = e.target;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // 🟢 On inclut toujours employee & departement
  const demandeData = {
    start: form.start.value,
    end: form.end.value,
    days: calcDays(form.start.value, form.end.value),
    type: form.type.value,
    status: "pending",
    reason: form.reason.value,
    employee: currentUser.employee,
    departement: currentUser.departement
  };

  try {
    if (editingId) {
      // 🟢 Update côté User
      await axios.put(`${API_URL}/conges/${editingId}`, demandeData);

      // 🟢 Update côté Admin (même ID pour rester synchro)
      await axios.put(`${API_URL}/adminConges/${editingId}`, demandeData);

      alert("✏️ Votre demande a été mise à jour !");
      editingId = null;
      document.getElementById("submit-btn").textContent = "Ajouter";
      localStorage.removeItem("editingConge");
      form.reset();
      window.location.href = "mesConges.html";

    } else {
      // 🟢 Ajout côté User
      const res = await axios.post(`${API_URL}/conges`, demandeData);

      // 🟢 Ajout côté Admin بنفس الـ ID
      await axios.post(`${API_URL}/adminConges`, {
        ...demandeData,
        id: res.data.id // force le même ID
      });

      alert("✅ Votre demande a été enregistrée !");
      form.reset();
    }
  } catch (err) {
    console.error("Erreur lors de l'enregistrement:", err);
  }
}

// 📌 Calcul automatique du nombre de jours
function calcDays(start, end) {
  if (!start || !end) return 0;
  const d1 = new Date(start);
  const d2 = new Date(end);
  const diff = (d2 - d1) / (1000 * 60 * 60 * 24) + 1;
  return diff > 0 ? diff : 0;
}

// 📌 Charger les 6 dernières demandes (User seulement)
async function loadLatestConges() {
  try {
    const res = await axios.get(`${API_URL}/conges?viewType=user&_sort=id&_order=desc&_limit=6`);
    const conges = res.data;

    const list = document.getElementById("dernieres-demandes");
    if (!list) return;
    list.innerHTML = "";

    conges.forEach(c => {
      let statusText = c.status === "approved" ? "Approuvé" : 
                       c.status === "refused" ? "Refusé" : "En attente";

      let statusClass = c.status === "approved" ? "bg-green-100 text-green-600" :
                        c.status === "refused" ? "bg-red-100 text-red-600" :
                        "bg-yellow-100 text-yellow-600";

      const li = document.createElement("li");
      li.className = "p-3 bg-gray-50 rounded-lg flex justify-between items-center";

      li.innerHTML = `
        <div>
          <p class="font-medium">${c.type}</p>
          <p class="text-gray-500 text-sm">${c.start} - ${c.end}</p>
        </div>
        <span class="px-2 py-1 text-xs font-semibold rounded ${statusClass}">
          ${statusText}
        </span>
      `;

      list.appendChild(li);
    });
  } catch (err) {
    console.error("Erreur sidebar:", err);
  }
}

// 🚀 Initialisation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("demande-form");
  if (form) form.addEventListener("submit", submitDemande);

  // 👇 Charger les dernières demandes
  loadLatestConges();

  // 👇 Vérif si modification
  const saved = localStorage.getItem("editingConge");
  if (saved) {
    const conge = JSON.parse(saved);
    editingId = conge.id;

    form.start.value = conge.start;
    form.end.value = conge.end;
    form.type.value = conge.type;
    form.reason.value = conge.reason;

    localStorage.removeItem("editingConge");
    document.getElementById("submit-btn").textContent = "Mettre à jour";
  }
});
