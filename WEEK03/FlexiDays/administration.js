document.addEventListener("DOMContentLoaded", () => {
  const congesContainer = document.getElementById("admin-conges-list");
  const apiUrl = "http://localhost:3000/conges";

  const statPending = document.getElementById("stat-pending");
  const statApproved = document.getElementById("stat-approved");
  const statRefused = document.getElementById("stat-refused");
  const statDays = document.getElementById("stat-days");

  const searchInput = document.getElementById("search-input");
  const filterStatus = document.getElementById("filter-status");
  const filterDept = document.getElementById("filter-dept");

  let allConges = [];
  let currentModifyId = null;

  // 🟦 Traduction statut
  function translateStatus(status) {
    switch (status) {
      case "pending":
      case "En attente":
        return "En attente";
      case "approved":
      case "Approuvé":
        return "Approuvé";
      case "refused":
      case "Refusé":
        return "Refusé";
      default:
        return status;
    }
  }

  // 🟦 Charger les congés
  async function loadConges() {
    try {
      const res = await axios.get(apiUrl);
      allConges = res.data;
      renderStats();
      renderConges(allConges);
    } catch (err) {
      console.error("Erreur chargement congés:", err);
    }
  }

  // 🟦 Stats
  function renderStats() {
    const pending = allConges.filter(c => translateStatus(c.status) === "En attente").length;
    const approved = allConges.filter(c => translateStatus(c.status) === "Approuvé").length;
    const refused = allConges.filter(c => translateStatus(c.status) === "Refusé").length;
    const totalDays = allConges.reduce((sum, c) => sum + (c.days || 0), 0);

    statPending.textContent = pending;
    statApproved.textContent = approved;
    statRefused.textContent = refused;
    statDays.textContent = totalDays;
  }

  // 🟦 Affichage des congés
  function renderConges(conges) {
    congesContainer.innerHTML = "";

    if (conges.length === 0) {
      congesContainer.innerHTML = `<p class="text-gray-500">Aucun congé trouvé.</p>`;
      return;
    }

    conges.forEach((c) => {
      const statusFr = translateStatus(c.status);
      const card = document.createElement("div");
      card.className =
        "bg-white shadow-md rounded-lg p-4 mb-4 border-l-4 " +
        (statusFr === "Approuvé"
          ? "border-green-500"
          : statusFr === "Refusé"
          ? "border-red-500"
          : "border-yellow-500");

      let actionButtons = "";
      if (statusFr === "En attente") {
        actionButtons = `
          <button data-id="${c.id}" class="approve-btn bg-green-500 text-white px-3 py-1 rounded">Approuver</button>
          <button data-id="${c.id}" class="refuse-btn bg-red-500 text-white px-3 py-1 rounded">Refuser</button>
        `;
      } else {
        actionButtons = `
          <button data-id="${c.id}" class="modify-btn bg-yellow-500 text-white px-3 py-1 rounded">Modifier</button>
          <button data-id="${c.id}" class="delete-btn bg-gray-500 text-white px-3 py-1 rounded">Supprimer</button>
        `;
      }

      card.innerHTML = `
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-lg font-semibold">${c.employee} - <span class="text-sm text-gray-500">${c.departement}</span></h3>
          <span class="px-3 py-1 text-sm rounded-full ${
            statusFr === "Approuvé"
              ? "bg-green-100 text-green-700"
              : statusFr === "Refusé"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }">
            ${statusFr}
          </span>
        </div>
        <p><strong>Type :</strong> ${c.type}</p>
        <p><strong>Raison :</strong> ${c.reason}</p>
        <p><strong>Dates :</strong> ${c.start} → ${c.end} (${c.days} jours)</p>
        <div class="flex gap-2 mt-3">
          ${actionButtons}
        </div>
      `;

      congesContainer.appendChild(card);
    });

    // Brancher les boutons
    document.querySelectorAll(".approve-btn").forEach((btn) => {
      btn.addEventListener("click", () => updateStatus(btn.dataset.id, "approved"));
    });

    document.querySelectorAll(".refuse-btn").forEach((btn) => {
      btn.addEventListener("click", () => updateStatus(btn.dataset.id, "refused"));
    });

    document.querySelectorAll(".modify-btn").forEach((btn) => {
      btn.addEventListener("click", () => openModal(btn.dataset.id));
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => deleteConges(btn.dataset.id));
    });
  }

  // 🟦 Update statut
  async function updateStatus(id, newStatus) {
    try {
      const res = await axios.get(`${apiUrl}/${id}`);
      const demande = res.data;

      await axios.put(`${apiUrl}/${id}`, {
        ...demande,
        status: newStatus,
        processedBy: "Admin"
      });

      loadConges();
      closeModal();
    } catch (err) {
      console.error("Erreur update:", err);
    }
  }

  // 🟦 Supprimer
  async function deleteConges(id) {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      loadConges();
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  }

  // ================= MODAL =================
  const modal = document.createElement("div");
  modal.id = "status-modal";
  modal.className =
    "hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50";
  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-lg w-80">
      <h2 class="text-lg font-semibold mb-4">Modifier le statut</h2>
      <select id="new-status" class="w-full border rounded p-2 mb-4">
        <option value="approved">Approuvé</option>
        <option value="refused">Refusé</option>
      </select>
      <div class="flex justify-end gap-2">
        <button id="cancel-btn" class="px-4 py-2 bg-gray-400 text-white rounded">Annuler</button>
        <button id="save-btn" class="px-4 py-2 bg-blue-500 text-white rounded">Enregistrer</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  function openModal(id) {
    currentModifyId = id;
    modal.classList.remove("hidden");
  }

  function closeModal() {
    modal.classList.add("hidden");
    currentModifyId = null;
  }

  document.getElementById("cancel-btn").addEventListener("click", closeModal);
  document.getElementById("save-btn").addEventListener("click", () => {
    const newStatus = document.getElementById("new-status").value;
    if (currentModifyId) {
      updateStatus(currentModifyId, newStatus);
    }
  });

  // ================= FILTRES =================
  function applyFilters() {
    let filtered = [...allConges];

    const searchValue = searchInput.value.toLowerCase();
    const statusValue = filterStatus.value;
    const deptValue = filterDept.value;

    if (searchValue) {
      filtered = filtered.filter((c) =>
        c.employee.toLowerCase().includes(searchValue)
      );
    }

    if (statusValue !== "Statut") {
      filtered = filtered.filter(
        (c) => translateStatus(c.status) === statusValue
      );
    }

    if (deptValue !== "Département") {
      filtered = filtered.filter((c) => c.departement === deptValue);
    }

    renderConges(filtered);
  }

  searchInput.addEventListener("input", applyFilters);
  filterStatus.addEventListener("change", applyFilters);
  filterDept.addEventListener("change", applyFilters);

  // Init
  loadConges();
});
