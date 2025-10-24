const API_URL = "http://localhost:3000";

// 📊 Charger les statistiques
async function loadStats() {
  try {
    const res = await axios.get(`${API_URL}/conges?viewType=user`);
    const conges = res.data;

    const pending = conges.filter(c => normalizeStatus(c.status) === "pending").length;
    const approved = conges.filter(c => normalizeStatus(c.status) === "approved").length;
    const refused = conges.filter(c => normalizeStatus(c.status) === "refused").length;

    document.getElementById("stat-pending").textContent = pending;
    document.getElementById("stat-approved").textContent = approved;
    document.getElementById("stat-refused").textContent = refused;

    const totalDays = conges.reduce((sum, c) => sum + (c.days || 0), 0);
    const soldeRestant = 30 - totalDays;
    document.getElementById("solde-restant").textContent = soldeRestant;
  } catch (err) {
    console.error("Erreur stats:", err);
  }
}

// 🗂️ Charger la liste avec option filtre
async function loadConges(filter = "all") {
  try {
    const res = await axios.get(`${API_URL}/conges?viewType=user`);
    let conges = res.data;

    if (filter !== "all") {
      conges = conges.filter(c => normalizeStatus(c.status) === filter);
    }

    const list = document.getElementById("conges-list");
    list.innerHTML = "";

    conges.forEach(c => {
      const statusKey = normalizeStatus(c.status);

      let statusMap = {
        "approved": { text: "Approuvé", color: "bg-green-100 text-green-600" },
        "pending": { text: "En attente", color: "bg-yellow-100 text-yellow-600" },
        "refused": { text: "Refusé", color: "bg-red-100 text-red-600" }
      };

      const statusInfo = statusMap[statusKey] || { text: "Inconnu", color: "bg-gray-100 text-gray-600" };

      const div = document.createElement("div");
      div.className = "bg-white p-8 rounded-xl shadow-lg w-full";

      div.innerHTML = `
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">${c.start} - ${c.end}</h2>
          <span class="${statusInfo.color} text-sm px-3 py-1 rounded-full">
            ${statusInfo.text}
          </span>
        </div>
        <p class="text-gray-600 text-base mt-1">${c.days} jours · ${c.type}</p>
        <p class="mt-4 text-lg"><span class="font-semibold">Motif</span><br>${c.reason}</p>
        ${c.processedBy ? `<p class="mt-3 text-base"><span class="font-semibold">${statusKey === "approved" ? "Approuvé par" : "Traité par"}</span><br>${c.processedBy}</p>` : ""}
        ${c.refusalReason ? `<div class="bg-red-100 text-red-700 text-base p-3 rounded-lg mt-4"><span class="font-semibold">Motif du refus</span><br>${c.refusalReason}</div>` : ""}
        ${
          statusKey === "pending" 
            ? `<div class="flex space-x-3 mt-4">
                 <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg modifier-btn" data-id="${c.id}">Modifier</button>
                 <button class="px-4 py-2 bg-red-100 text-red-600 rounded-lg annuler-btn" data-id="${c.id}">Annuler</button>
               </div>`
            : ""
        }
      `;
      list.appendChild(div);
    });

    // ⚡ brancher les boutons
    document.querySelectorAll(".modifier-btn").forEach(btn => {
      btn.addEventListener("click", handleModifier);
    });

    document.querySelectorAll(".annuler-btn").forEach(btn => {
      btn.addEventListener("click", handleAnnuler);
    });

  } catch (err) {
    console.error("Erreur conges:", err);
  }
}

// helper pour status
function normalizeStatus(status) {
  if (!status) return "unknown";
  const s = status.toString().toLowerCase();
  if (s.includes("approved") || s.includes("approuvé")) return "approved";
  if (s.includes("refused") || s.includes("refusé")) return "refused";
  if (s.includes("pending") || s.includes("attente")) return "pending";
  return "unknown";
}

// ✏️ Modifier
async function handleModifier(e) {
  const id = e.target.dataset.id;

  try {
    const res = await axios.get(`${API_URL}/conges/${id}`);
    const conge = res.data;

    localStorage.setItem("editingConge", JSON.stringify(conge));
    window.location.href = "demandeDeCongé.html";
  } catch (err) {
    console.error("Erreur lors du chargement de la demande à modifier:", err);
  }
}

// ❌ Annuler
async function handleAnnuler(e) {
  const id = e.target.dataset.id;
  if (confirm("Voulez-vous vraiment annuler cette demande ?")) {
    await axios.delete(`${API_URL}/conges/${id}`);
    loadConges();
    loadStats();
  }
}

// 🚀 Initialisation
document.addEventListener("DOMContentLoaded", () => {
  loadStats();
  loadConges();

  lucide.createIcons();

  const filterSelect = document.getElementById("filter-status");
  filterSelect.addEventListener("change", (e) => {
    loadConges(e.target.value);
  });
});
