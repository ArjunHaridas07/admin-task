import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = ({ username, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/register');
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome, {username}!</h2>
      <div className="flex flex-col items-center">
        {username === 'admin' ? (
          <Link to="/admin" className="text-blue-500 hover:underline mb-4 text-lg">
            Go to Admin Panel
          </Link>
        ) : (
          <Link to="/login" className="text-blue-500 hover:underline mb-4 text-lg">
            Go back to Login
          </Link>
        )}
        <button 
          onClick={handleLogout} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
