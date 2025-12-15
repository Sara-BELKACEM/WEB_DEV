import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import AppointmentCard from "../components/AppointmentCard";
import Footer from "../components/Footer";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = () => {
    api.get("/appointments")
      .then(res => setAppointments(res.data));
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const approve = async (id) => {
    await api.patch(`/appointments/${id}/status`, { status: "approved" });
    loadAppointments();
  };

  const reject = async (id) => {
    await api.patch(`/appointments/${id}/status`, { status: "rejected" });
    loadAppointments();
  };

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        {appointments.map(app => (
          <AppointmentCard
            key={app.id}
            appointment={app}
            isAdmin
            onApprove={approve}
            onReject={reject}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}
