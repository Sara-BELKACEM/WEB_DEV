import React, { useState } from 'react';

const AddRoutineForm = ({ users, onAddRoutine }) => {
  const [routineText, setRoutineText] = useState('');
  // On initialise avec l'ID du premier utilisateur par défaut
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id || '');

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche la page de se recharger
    
    if (!routineText.trim() || !selectedUserId) {
        alert("Veuillez écrire une routine et sélectionner un membre.");
        return;
    }

    onAddRoutine(parseInt(selectedUserId), routineText);

    setRoutineText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4 mb-8">
      <input
        type="text"
        value={routineText}
        onChange={(e) => setRoutineText(e.target.value)}
        placeholder="Ajouter une nouvelle routine..."
        className="flex-grow w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition"
      />
      <div className="relative w-full md:w-auto">
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full md:w-48 bg-slate-800 border border-slate-700 rounded-lg p-3 appearance-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition"
        >
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <button
        type="submit"
        className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <span>Ajouter</span>
      </button>
    </form>
  );
};

export default AddRoutineForm;