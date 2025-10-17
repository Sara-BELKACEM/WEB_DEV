import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-700 to-pink-600 text-white mt-20 py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* Section 1 */}
        <div>
          <h3 className="text-lg font-bold mb-3">Maroc Digital Hub</h3>
          <p className="text-sm opacity-90">
            La plateforme premium de référence pour l’écosystème startup marocain. 
            Connectez-vous, collaborez et innovez avec les meilleurs.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="text-lg font-bold mb-3">Navigation Premium</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>Accueil</li>
            <li>Événements</li>
            <li>Dashboard</li>
            <li>Discussions</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="text-lg font-bold mb-3">© 2025 StartupHub Elite</h3>
          <p className="text-sm opacity-90">
            Tous droits réservés. Plateforme premium certifiée.
          </p>
        </div>
      </div>
    </footer>
  );
}
