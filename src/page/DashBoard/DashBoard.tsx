
import React, { useEffect, useState } from 'react';
import './DashBoard.css';
import UserDashboard from './UserDashBoard';
import AdminDashboard from './AdminDashBoard';

const Dashboard: React.FC = () => {
  const storedUser = localStorage.getItem('user');

  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <p>Please log in</p>;
  }

  return (
    <div className="dashboard">
      
      {user.role === 'user' ? (
        <UserDashboard userId={user.userId} username={user.username} />
      ) : (
        <AdminDashboard userId={user.userId}  username={user.username}/>
      )}
    </div>
  );
};

export default Dashboard;
