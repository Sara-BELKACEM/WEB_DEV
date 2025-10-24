import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStartups } from "../Redux/startups/startupsSlice";
import { fetchEvents } from "../Redux/events/eventsSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const dispatch = useDispatch();
  const { items: startups, loading: loadingStartups } = useSelector((s) => s.startups);
  const { items: events, loading: loadingEvents } = useSelector((s) => s.events);

  useEffect(() => {
    dispatch(fetchStartups());
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-b from-purple-700 via-purple-600 to-pink-500 min-h-screen text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-32 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          L’écosystème numérique de prestige au Maroc
        </h1>
        <p className="text-lg opacity-90 mb-6">
          Connectez-vous avec les startups les plus innovantes, participez à des événements exclusifs
          et développez votre réseau professionnel.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="px-6 py-3 bg-yellow-400 text-purple-800 font-semibold rounded-lg hover:bg-yellow-300 transition">
            Publier ma startup
          </button>
          <button className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition">
            Découvrir
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-12">
          <div className="text-center">
            <p className="text-3xl font-bold">150+</p>
            <p>Startups</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">500+</p>
            <p>Membres</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">25+</p>
            <p>Événements</p>
          </div>
        </div>
      </section>

      {/* SECTEURS */}
      <section className="bg-white text-gray-800 mt-20 py-12 px-6 rounded-t-3xl">
        <h2 className="text-center text-3xl font-bold mb-3 text-purple-700">Secteurs en tendance</h2>
        <p className="text-center mb-8 text-gray-600">
          Explorez les domaines les plus dynamiques de l’écosystème numérique marocain
        </p>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {["IA", "Fintech", "E-commerce", "EdTech", "AgriTech", "Santé"].map((cat) => (
            <div
              key={cat}
              className="bg-purple-100 text-purple-700 p-4 rounded-lg text-center font-medium hover:bg-purple-200 transition"
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* DERNIÈRES STARTUPS */}
      <section className="bg-gradient-to-r from-purple-700 to-pink-500 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Dernières startups</h2>
            <button className="text-sm bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition">
              Voir toute →
            </button>
          </div>

          {loadingStartups ? (
            <p>Chargement des startups...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {startups.map((s) => (
                <div
                  key={s.id}
                  className="bg-white text-gray-800 p-6 rounded-xl shadow hover:scale-105 transition"
                >
                  <h3 className="font-semibold text-lg mb-2">{s.name}</h3>
                  <p className="text-sm opacity-80">{s.description}</p>
                  <span className="inline-block mt-3 text-xs bg-purple-200 text-purple-700 px-3 py-1 rounded-full">
                    {s.sector}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ÉVÉNEMENTS */}
      <section className="bg-white text-gray-800 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-purple-700">Événements à venir</h2>
            <button className="text-sm bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition">
              Voir toute →
            </button>
          </div>

          {loadingEvents ? (
            <p>Chargement des événements...</p>
          ) : (
            <div className="grid md:grid-cols-4 gap-6">
              {events.map((e) => (
                <div
                  key={e.id}
                  className="border rounded-xl p-6 shadow hover:shadow-lg transition"
                >
                  <h3 className="font-semibold text-lg mb-2">{e.title}</h3>
                  <p className="text-sm text-gray-600">
                    {e.date} • {e.place}
                  </p>
                  <button className="mt-4 text-sm border border-purple-700 text-purple-700 px-3 py-1 rounded-lg hover:bg-purple-700 hover:text-white transition">
                    Connexion requise
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
