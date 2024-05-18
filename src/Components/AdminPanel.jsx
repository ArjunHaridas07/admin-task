import React from 'react';
import { FaUser } from 'react-icons/fa';

const AdminPanel = ({ userList }) => {
  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Admin Panel</h2>
      <ul className="space-y-4">
        {userList.map((user, index) => (
          <li key={index} className="flex items-center space-x-3 text-lg text-gray-700">
            <FaUser className="text-blue-500" />
            <span>{user}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
