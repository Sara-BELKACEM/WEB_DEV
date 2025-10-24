import './App.css'
import React, { useState, useEffect  } from 'react';
import { initialUsers } from './data/data';
import AddRoutineForm from './components/AddRoutineForm'; 
import AddMemberCard from './components/AddMemberCard';
import UserCard from './components/UserCard';


const userColors = ["bg-pink-500", "bg-blue-500", "bg-yellow-500", "bg-indigo-500", "bg-teal-500"];


function App() {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('dailyHabitsUsers');
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });
   useEffect(() => {
    localStorage.setItem('dailyHabitsUsers', JSON.stringify(users));
  }, [users]);

  const handleAddMember = () => {
    const name = prompt("Entrez le nom du nouveau membre :");
    
    // Si l'utilisateur clique sur "Annuler" ou ne met pas de nom, on ne fait rien
    if (!name || !name.trim()) {
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      avatar: name.trim().charAt(0).toUpperCase(),
      // On choisit une couleur au hasard dans notre liste
      color: userColors[Math.floor(Math.random() * userColors.length)],
      routines: [], // Le nouveau membre n'a pas encore de routines
    };

    setUsers(currentUsers => [...currentUsers, newUser]);
  };
  
  const handleToggleRoutine = (userId, routineId) => {
    setUsers(currentUsers => {
      return currentUsers.map(user => {
        if (user.id === userId) {
          const updatedRoutines = user.routines.map(routine => {
            if (routine.id === routineId) {
              return { ...routine, completed: !routine.completed };
            }
            return routine;
          });
          return { ...user, routines: updatedRoutines };
        }
        return user;
      });
    });
  };
  
  const handleDeleteRoutine = (userId, routineId) => {
    setUsers(currentUsers =>
      currentUsers.map(user => {
        if (user.id === userId) {
          // On filtre la liste des routines pour enlever celle avec le bon ID
          const updatedRoutines = user.routines.filter(
            routine => routine.id !== routineId
          );
          return { ...user, routines: updatedRoutines };
        }
        return user;
      })
    );
  };
  
  const handleAddRoutine = (userId, routineText) => {
    const newRoutine = {
      id: Date.now(), // Génère un ID unique simple
      text: routineText,
      completed: false,
    };

    setUsers(currentUsers =>
      currentUsers.map(user => {
        if (user.id === userId) {
          // On retourne un nouvel objet utilisateur avec la nouvelle routine ajoutée
          return { ...user, routines: [...user.routines, newRoutine] };
        }
        return user;
      })
    );
  };


  const calculateGlobalProgress = () => {
    let totalRoutines = 0;
    let completedRoutines = 0;
    
    users.forEach(user => {
      totalRoutines += user.routines.length;
      completedRoutines += user.routines.filter(r => r.completed).length;
    });

    if (totalRoutines === 0) {
      return 0;
    }

    return Math.round((completedRoutines / totalRoutines) * 100);
  };

  const globalProgress = calculateGlobalProgress();

  return (
    <div className="min-h-screen min-w-screen bg-custom-gradient p-6">
      <h1 className="text-6xl font-bold text-gradient mb-6 text-center">Daily Habits Tracker</h1>
      <p className="text-xl text-amber-100 text-center">L'excellence au quotidien ✨ Transformez vos habitudes, révélez votre potentiel</p>
      <span className='block mx-auto py-2 w-40 mt-6 rounded-2xl bg-gradient-to-r from-[#FA72FF] via-[#F3B407] to-[#2EF307]'></span>
      <div className="grid crid-col-1 md:grid-cols-3 md:px-16 gap-12 p-9 px-12">
        <div className="bg-purple-950/40 p-6 rounded-2xl border-2 border-b-fuchsia-500 text-center">
          <p className='text-amber-100 text-xl'>Progression Collective</p>
          <p className="text-pink-400 text-3xl font-bold">{globalProgress}%</p>
        </div>
        <div className="bg-purple-950/40 p-6 rounded-2xl border-2 border-b-yellow-400 text-center">
          <p className='text-amber-100 text-xl'>Membres Elite</p>
          <p className="text-yellow-400 text-3xl font-bold">{users.length}</p>
        </div>
        <div className="bg-purple-950/40 p-6 rounded-2xl border-2 border-b-green-600 text-center">
          <p className='text-amber-100 text-xl'>Réussites Aujourd'hui</p>
          <p className="text-green-600 text-3xl font-bold"> {/* Logique à affiner plus tard si besoin */}
              {users.reduce((acc, user) => acc + user.routines.filter(r => r.completed).length, 0)}
              /
              {users.reduce((acc, user) => acc + user.routines.length, 0)}</p>
        </div>
      </div>

       <div className="bg-purple-950/40 border-2 border-fuchsia-600 rounded-lg p-9 mb-8 mx-13">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h2 className="text-2xl font-bold text-amber-50 mb-2">Excellence Collective</h2>
                    <p className="text-slate-400 font-light text-xl md:text-2xl mb-2 ">L'union fait la force • Performance du groupe</p>
                </div>
                <span className="text-xl font-bold text-yellow-400">{globalProgress}%</span>
            </div>
            {/* La barre de progression globale */}
            <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div 
                    className="bg-yellow-400 h-2.5 rounded-full" 
                    style={{ width: `${globalProgress}%` }}>
                </div>
            </div>
        </div>
        <div className="my-8">
            <AddRoutineForm users={users} onAddRoutine={handleAddRoutine} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map(user => (
            <UserCard 
              key={user.id} 
              user={user} 
              onToggleRoutine={handleToggleRoutine} 
              onDeleteRoutine={handleDeleteRoutine} 
            />
          ))}
          <AddMemberCard onAddMember={handleAddMember} />
        </div>

  
      
    </div>
  )
}

export default App
