import React from 'react';

const RoutineCard = ({ routine, userId, onToggleRoutine, onDeleteRoutine }) => {
  // On utilise `completed` pour déterminer le style
  const cardStyle = routine.completed
    ? 'bg-green-500/20 border-green-500'
    : 'bg-slate-700 border-transparent';
  
  const buttonStyle = routine.completed
    ? 'bg-green-500 text-white'
    : 'border border-slate-500 text-slate-300';

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${cardStyle} transition-all`}>
      <span>{routine.text}</span>
      <button 
        onClick={() => onToggleRoutine(userId, routine.id)}
        className={`px-3 py-1 text-sm font-semibold rounded-md ${buttonStyle}`}>
        {routine.completed ? 'Accompli ✔' : 'À faire'}
      </button>
      <button 
        onClick={() => onDeleteRoutine(userId, routine.id)}
        className="bg-slate-500 hover:bg-red-500 rounded font-bold px-2 transition-colors"
        aria-label="Supprimer la routine"
      >
        🗑 
      </button>
    </div>
  );
};

export default RoutineCard;