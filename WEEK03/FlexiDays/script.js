const API_URL = "http://localhost:3000";

// 1. Statistiques
async function loadStats() {
  try {
    const res = await axios.get(`${API_URL}/demandes`);
    const demandes = res.data;

    const pending = demandes.filter(d => d.status === "pending").length;
    const approved = demandes.filter(d => d.status === "approved").length;
    const refused = demandes.filter(d => d.status === "refused").length;

    document.getElementById("pending-count").textContent = `${pending} demandes`;
    document.getElementById("approved-days").textContent = `${approved} demandes`;
    document.getElementById("refused-days").textContent = `${refused} demandes`;
  } catch (err) {
    console.error("Erreur stats:", err);
  }
}

// 2. Notifications
async function loadNotifications() {
  try {
    const res = await axios.get(`${API_URL}/notifications`);
    const notifications = res.data;

    const container = document.getElementById("notifications-list");
    container.innerHTML = "";

    notifications.forEach(n => {
      const div = document.createElement("div");
      div.className = "bg-gray-50 p-4 rounded-lg hover:bg-blue-50 transition flex items-center justify-between";
      div.innerHTML = `
        <p><strong>${n.title} :</strong> ${n.message}</p>
        <span class="text-gray-500 text-sm">${n.date}</span>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Erreur notifications:", err);
  }
}

// 3. Solde
async function loadSolde() {
  try {
    const res = await axios.get(`${API_URL}/solde`);
    const solde = res.data[0];
    document.getElementById("solde-paid").textContent = solde.paid + " jours";
    document.getElementById("solde-sick").textContent = solde.sick + " jours";
    document.getElementById("solde-rtt").textContent = solde.rtt + " jours";
  } catch (err) {
    console.error("Erreur solde:", err);
  }
}

// 4. Upcoming
async function loadUpcoming() {
  try {
    const res = await axios.get(`${API_URL}/upcoming`);
    const upcoming = res.data;

    const list = document.getElementById("upcoming-list");
    list.innerHTML = "";

    upcoming.forEach(u => {
      const li = document.createElement("li");
      li.className = "p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition";
      li.innerHTML = `
        <p class="font-medium">${u.title}</p>
        <p class="text-blue-600 font-semibold">${u.dates}</p>
      `;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Erreur upcoming:", err);
  }
}

// 🚀 تحميل البيانات عند فتح الصفحة
document.addEventListener("DOMContentLoaded", () => {
  loadStats();
  loadNotifications();
  loadSolde();
  loadUpcoming();
});
