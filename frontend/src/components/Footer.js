import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">
              <span className="footer-logo">🚗 CarInsure AI</span>
            </h3>
            <p className="footer-description">
              AI-powered car insurance quotes with transparent pricing and instant comparisons.
            </p>
            <div className="footer-stats">
              <div className="footer-stat">
                <span className="stat-value">4.8★</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="footer-stat">
                <span className="stat-value">100k+</span>
                <span className="stat-label">Customers</span>
              </div>
              <div className="footer-stat">
                <span className="stat-value">24hrs</span>
                <span className="stat-label">Claims</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/get-quote">Get Quote</Link></li>
              <li><Link to="/insights">Insights</Link></li>
              <li><Link to="/compare-plans">Compare Plans</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-contact">
              <li>📧 support@carinsure.ai</li>
              <li>📞 1800-123-4567</li>
              <li>📍 Mumbai, India</li>
              <li>🕒 24/7 Support</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 CarInsure AI. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
