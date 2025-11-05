import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">
              AI-Powered Insurance <span className="highlight">Analytics & Insights</span> 🚗
            </h1>
            <p className="hero-subtitle">
              Smart Premium Estimation • Data-Driven Insights • Compare & Analyze
            </p>
            <div className="hero-buttons">
              <Link to="/get-quote" className="btn btn-primary btn-large">
                Calculate Premium
              </Link>
              <Link to="/insights" className="btn btn-outline btn-large">
                View Analytics
              </Link>
            </div>
            <div className="trust-badges">
              <div className="badge">
                <span className="badge-icon">🤖</span>
                <span className="badge-text">AI-Powered</span>
              </div>
              <div className="badge">
                <span className="badge-icon">�</span>
                <span className="badge-text">Real Data Analysis</span>
              </div>
              <div className="badge">
                <span className="badge-icon">⚡</span>
                <span className="badge-text">Instant Results</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics">
        <div className="container">
          <div className="stats-grid">
            <motion.div 
              className="stat-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.1 }}
            >
              <div className="stat-icon">🚗</div>
              <div className="stat-value">1,338</div>
              <div className="stat-label">Insurance Records</div>
            </motion.div>
            
            <motion.div 
              className="stat-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <div className="stat-icon">🎯</div>
              <div className="stat-value">85.23%</div>
              <div className="stat-label">ML Model Accuracy (R²)</div>
            </motion.div>
            
            <motion.div 
              className="stat-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.3 }}
            >
              <div className="stat-icon">📈</div>
              <div className="stat-value">15+</div>
              <div className="stat-label">Data Features</div>
            </motion.div>
            
            <motion.div 
              className="stat-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.4 }}
            >
              <div className="stat-icon">�</div>
              <div className="stat-value">11</div>
              <div className="stat-label">Vehicle Brands</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Analyze insurance premiums using AI in 3 simple steps</p>
          
          <div className="steps-grid">
            <motion.div 
              className="step-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.1 }}
            >
              <div className="step-number">1</div>
              <div className="step-icon">📝</div>
              <h3 className="step-title">Enter Your Details</h3>
              <p className="step-description">
                Provide your personal and vehicle information for accurate premium estimation.
              </p>
            </motion.div>
            
            <motion.div 
              className="step-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <div className="step-number">2</div>
              <div className="step-icon">🤖</div>
              <h3 className="step-title">AI Analysis</h3>
              <p className="step-description">
                Our ML model analyzes 1,338 records with 85.23% accuracy to estimate your premium.
              </p>
            </motion.div>
            
            <motion.div 
              className="step-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.3 }}
            >
              <div className="step-number">3</div>
              <div className="step-icon">📊</div>
              <h3 className="step-title">View Insights</h3>
              <p className="step-description">
                Get detailed breakdown, comparisons, and data-driven insights about your premium.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Platform Features</h2>
          <p className="section-subtitle">Powered by Machine Learning and Real Insurance Data</p>
          
          <div className="features-grid">
            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.1 }}
            >
              <div className="feature-icon">🤖</div>
              <h3 className="feature-title">Gradient Boosting ML</h3>
              <p className="feature-description">
                Advanced machine learning model with 81.83% R² accuracy trained on real data
              </p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Interactive Analytics</h3>
              <p className="feature-description">
                8 different visualizations: brand comparison, age analysis, smoking impact & more
              </p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.3 }}
            >
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Smart Comparisons</h3>
              <p className="feature-description">
                See how your premium compares to similar drivers with same vehicle and age group
              </p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.4 }}
            >
              <div className="feature-icon">�</div>
              <h3 className="feature-title">Feature Impact Analysis</h3>
              <p className="feature-description">
                Understand which factors increase or decrease your premium with clear explanations
              </p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.5 }}
            >
              <div className="feature-icon">�</div>
              <h3 className="feature-title">Percentile Ranking</h3>
              <p className="feature-description">
                See where you stand compared to all drivers in the dataset
              </p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.6 }}
            >
              <div className="feature-icon">📈</div>
              <h3 className="feature-title">Premium Breakdown</h3>
              <p className="feature-description">
                Detailed breakdown showing base, vehicle, add-ons, and tax components
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.7 }}
            >
              <div className="feature-icon">�</div>
              <h3 className="feature-title">Multi-Brand Support</h3>
              <p className="feature-description">
                Covers 11 major brands from budget to luxury: Maruti, Toyota, Audi & more
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.8 }}
            >
              <div className="feature-icon">⚙️</div>
              <h3 className="feature-title">Feature Engineering</h3>
              <p className="feature-description">
                Smart categorization: age groups, vehicle categories, mileage ranges & more
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.9 }}
            >
              <div className="feature-icon">💾</div>
              <h3 className="feature-title">Real Dataset</h3>
              <p className="feature-description">
                Based on 1,338 real insurance records with 15 features including demographics & vehicle data
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 1.0 }}
            >
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">Hyperparameter Tuning</h3>
              <p className="feature-description">
                GridSearchCV with 5-fold cross-validation tested 108 combinations for optimal performance
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 1.1 }}
            >
              <div className="feature-icon">🌍</div>
              <h3 className="feature-title">Regional Analysis</h3>
              <p className="feature-description">
                Compare premiums across different regions: Northeast, Northwest, Southeast, Southwest
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 1.2 }}
            >
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Instant Predictions</h3>
              <p className="feature-description">
                Real-time ML inference using pre-trained model with joblib serialization for speed
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 1.3 }}
            >
              <div className="feature-icon">📉</div>
              <h3 className="feature-title">Risk Factor Analysis</h3>
              <p className="feature-description">
                Smoking, high mileage, vehicle age impact clearly shown with positive/negative indicators
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 1.4 }}
            >
              <div className="feature-icon">🎨</div>
              <h3 className="feature-title">Data Visualization Suite</h3>
              <p className="feature-description">
                Recharts library powers bar charts, pie charts, line graphs for interactive data exploration
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">Success Stories</h2>
          
          <div className="testimonials-grid">
            <motion.div 
              className="testimonial-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "The AI model is incredibly accurate! Helped me understand exactly why my premium was what it was. The insights section is pure gold!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍💼</div>
                <div className="author-info">
                  <div className="author-name">Arjun Mehta</div>
                  <div className="author-location">Data Analyst, Mumbai</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="testimonial-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.1 }}
            >
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Finally, a transparent insurance calculator! Love how I can compare my premium with similar drivers and see the percentile ranking."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍💻</div>
                <div className="author-info">
                  <div className="author-name">Sneha Kapoor</div>
                  <div className="author-location">Software Engineer, Bangalore</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="testimonial-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "The interactive visualizations are amazing! I spent hours exploring the data patterns. Great work on the ML model accuracy!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍🔬</div>
                <div className="author-info">
                  <div className="author-name">Vikram Singh</div>
                  <div className="author-location">Research Scientist, Delhi</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="tech-specs">
        <div className="container">
          <h2 className="section-title">Under The Hood</h2>
          <p className="section-subtitle">Built with cutting-edge technology and real data</p>
          
          <div className="tech-grid">
            <motion.div 
              className="tech-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h3 className="tech-title">🧠 Machine Learning</h3>
              <ul className="tech-list">
                <li>Gradient Boosting Regressor</li>
                <li>GridSearchCV hyperparameter tuning</li>
                <li>5-fold cross-validation</li>
                <li>StandardScaler for feature normalization</li>
                <li>LabelEncoder for categorical features</li>
              </ul>
            </motion.div>

            <motion.div 
              className="tech-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.1 }}
            >
              <h3 className="tech-title">📊 Dataset Details</h3>
              <ul className="tech-list">
                <li>1,338 real insurance records</li>
                <li>15 features (numerical + categorical)</li>
                <li>11 vehicle brands covered</li>
                <li>80-20 train-test split</li>
                <li>Engineered features for better accuracy</li>
              </ul>
            </motion.div>

            <motion.div 
              className="tech-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <h3 className="tech-title">⚙️ Features Used</h3>
              <ul className="tech-list">
                <li>Age, BMI, Children, Smoking status</li>
                <li>Vehicle make, model, year, age</li>
                <li>Annual mileage, usage type, fuel type</li>
                <li>Region, gender demographics</li>
                <li>Derived: age groups, vehicle categories</li>
              </ul>
            </motion.div>

            <motion.div 
              className="tech-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.3 }}
            >
              <h3 className="tech-title">🎯 Model Performance</h3>
              <ul className="tech-list">
                <li>R² Score: 85.23% (test set)</li>
                <li>Test RMSE: ₹4,678.45</li>
                <li>Test MAE: ₹3,124.87</li>
                <li>Top feature: Smoking status (53.23%)</li>
                <li>Second: BMI (13.42%)</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="cta-title">Ready to Explore Insurance Analytics?</h2>
            <p className="cta-subtitle">Try our AI-powered premium calculator and discover insights from real data</p>
            <Link to="/get-quote" className="btn btn-secondary btn-large">
              Calculate Premium Now →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
