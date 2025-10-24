import React from 'react';
import UserCard from './UserCard'; // On va le créer maintenant

const UserList = ({ users , onToggleRoutine }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {users.map(user => (
        <UserCard key={user.id} user={user} onToggleRoutine={onToggleRoutine} />
      ))}
    </div>
  );
};

export default UserList;