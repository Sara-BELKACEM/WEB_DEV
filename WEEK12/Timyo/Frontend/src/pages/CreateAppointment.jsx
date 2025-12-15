import React, { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";  
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function CreateAppointment() {
  const [form, setForm] = useState({ date: "", time: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/appointments", form);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">New Appointment</h1>

      <form onSubmit={submit} className="space-y-4">
        <input type="date" className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, date: e.target.value })} />

        <input type="time" className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, time: e.target.value })} />

        <button className="bg-black text-white w-full py-2">Create</button>
      </form>
    </div>
  );
}
