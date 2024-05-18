import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import RegistrationForm from './Components/RegistrationForm';
import LoginForm from './Components/LoginForm';
import Dashboard from './Components/Dashboard';
import AdminPanel from './Components/AdminPanel';
import './App.css';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Load users from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  // Update localStorage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleRegister = (username, password) => {
    // Check for duplicate username
    if (users.some(user => user.username === username)) {
      alert('Username already exists');
      return false;
    }
    // Add new user
    setUsers(prevUsers => [...prevUsers, { username, password }]);
    alert('Registration successful. You can now login.');
    return true;
  };

  const handleLogin = (username, password) => {
    const isAdmin = username === 'admin' && password === 'admin';

    if (isAdmin) {
      setLoggedInUser('admin');
      return true;
    } else {
      // Finding user
      const user = users.find(user => user.username === username && user.password === password);
      if (user) {
        setLoggedInUser(username);
        return true;
      } else {
        return false;
      }
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    window.location.href = '/register';
  };

  return (
    <Router> 
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4 shadow-lg">
          <ul className="flex justify-between items-center container mx-auto">
            {loggedInUser ? (
              <>
                <li>
                  <Link to="/dashboard" className="text-white hover:text-gray-300 text-lg">Dashboard</Link>
                </li>
                {loggedInUser === 'admin' && (
                  <li>
                    <Link to="/admin" className="text-white hover:text-gray-300 text-lg">Admin Panel</Link>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout} className="text-white hover:text-gray-300 text-lg">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-white hover:text-gray-300 text-lg">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="text-white hover:text-gray-300 text-lg">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/register" element={<RegistrationForm onRegister={handleRegister} />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/dashboard" element={<Dashboard username={loggedInUser} onLogout={handleLogout} />} />
            <Route
              path="/admin"
              element={
                loggedInUser === 'admin' ? (
                  <AdminPanel userList={users.map(user => user.username)} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
