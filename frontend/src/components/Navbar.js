import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
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
            <Link to="/compare-plans" className="nav-link">Compare Plans</Link>
          </div>
          
          <Link to="/get-quote" className="btn btn-primary navbar-cta">
            Calculate Premium
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
