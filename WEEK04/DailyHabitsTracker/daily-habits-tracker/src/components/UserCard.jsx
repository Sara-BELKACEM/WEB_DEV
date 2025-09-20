import React from 'react';
import RoutineList from './RoutineList'; // On va le créer juste après

const UserCard = ({ user, onToggleRoutine, onDeleteRoutine  }) => {
  // Calcul simple de la progression pour l'affichage
  const completedRoutines = user.routines.filter(r => r.completed).length;
  const totalRoutines = user.routines.length;
  const progress = totalRoutines > 0 ? Math.round((completedRoutines / totalRoutines) * 100) : 0;

  return (
    <div className="bg-slate-800 rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${user.color}`}>
          {user.avatar}
        </div>
        <div>
          <h3 className="font-bold text-lg">{user.name}</h3>
          <p className="text-xs text-green-400">Membre Elite</p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-400">Excellence Quotidienne</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-violet-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        {/* On met une barre statique pour la performance hebdomadaire pour l'instant */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-400">Performance Hebdomadaire</span>
            <span>0%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
        </div>
      </div>
      
      {/* Routines */}
      <RoutineList routines={user.routines} 
      userId={user.id} 
      onToggleRoutine={onToggleRoutine}
      onDeleteRoutine={onDeleteRoutine}
      />

      {/* Add new routine button */}
      <button className="w-full mt-4 bg-slate-700 hover:bg-slate-600 text-slate-300 py-2 rounded-lg transition-colors">
        + Ajouter une nouvelle routine
      </button>
    </div>
  );
};

export default UserCard;