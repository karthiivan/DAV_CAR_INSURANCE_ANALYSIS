import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">🚗</span>
            <span className="logo-text">CarInsure AI</span>
          </Link>
          
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/get-quote" className="nav-link">Get Quote</Link>
            <Link to="/insights" className="nav-link">Insights</Link>
            <Link to="/model-results" className="nav-link">Model Results</Link>
          </div>
          
          <div className="navbar-actions">
            {user ? (
              <div className="user-menu">
                <span className="user-name">👤 {user.name || user.email}</span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary navbar-cta">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
