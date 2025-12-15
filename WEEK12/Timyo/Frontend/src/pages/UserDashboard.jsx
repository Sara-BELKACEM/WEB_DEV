import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AppointmentCard from "../components/AppointmentCard";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const [appointments, setAppointments] = useState([]);

  const load = () => {
    api.get("/appointments/my").then((res) => setAppointments(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id) => {
    await api.delete(`/appointments/${id}`);
    load();
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">Your Appointments</h1>
        {appointments.length === 0 && <p>No appointments yet.</p>}
        <Link to="/create" className="underline">
          + New Appointment
        </Link>

        {appointments.map((a) => (
          <AppointmentCard key={a.id} appointment={a} onCancel={cancel} />
        ))}
      </div>
      <Footer />
    </>
  );
}
