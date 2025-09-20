// src/components/AddMemberCard.jsx
import React from 'react';

const AddMemberCard = ({ onAddMember }) => {
  return (
    <button
      onClick={onAddMember} // <-- On utilise la fonction ici
      className="bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-800/80 hover:border-violet-500 transition-colors cursor-pointer min-h-[300px] w-full"
    >
      <div className="mb-4">
        <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-3xl text-slate-400">
          +
        </div>
      </div>
      <h3 className="text-lg font-bold">Ajouter un membre</h3>
      <p className="text-slate-400 mt-1">Invitez quelqu'un à rejoindre vos routines</p>
    </button>
  );
};

export default AddMemberCard;