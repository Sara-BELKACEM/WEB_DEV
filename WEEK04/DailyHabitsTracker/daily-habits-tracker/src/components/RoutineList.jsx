import React from 'react';
import RoutineCard from './RoutineCard'; // Le dernier composant d'affichage

const RoutineList = ({ routines, userId, onToggleRoutine, onDeleteRoutine }) => {
  return (
    <div className="space-y-3">
        <h4 className="font-semibold text-slate-300">Routines du jour ({routines.filter(r => r.completed).length}/{routines.length})</h4>
        {routines.map(routine => (
            <RoutineCard key={routine.id} 
            routine={routine} 
            userId={userId} 
            onToggleRoutine={onToggleRoutine}
            onDeleteRoutine={onDeleteRoutine}
            />
        ))}
    </div>
  );
};

export default RoutineList;