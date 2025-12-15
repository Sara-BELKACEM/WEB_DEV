import  React, { createContext, useEffect, useState } from "react";
import api, { csrf } from "../api/axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/user")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (data) => {
    await csrf();
    const res = await api.post("/login", data);
    setUser(res.data.user);
    toast.success("Logged in successfully");
  };

  const register = async (data) => {
    await csrf();
    const res = await api.post("/register", data);
    setUser(res.data.user);
    toast.success("Account created");
  };

  const logout = async () => {
    await api.post("/logout");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
