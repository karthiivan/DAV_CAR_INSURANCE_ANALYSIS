import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import './Insights.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Insights() {
  const [activeTab, setActiveTab] = useState('brands');
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await fetch(`${API_URL}/api/insights`);
      const data = await response.json();
      setInsights(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching insights:', error);
      setLoading(false);
    }
  };

  const COLORS = ['#1E3A8A', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6'];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="insights loading-container">
        <div className="spinner"></div>
        <p>Loading insights...</p>
      </div>
    );
  }

  return (
    <div className="insights">
      <div className="container">
        <motion.div 
          className="insights-header"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="page-title">Smart Insurance Insights 📊</h1>
          <p className="page-subtitle">See what affects insurance costs - based on 1,338 real customers</p>
        </motion.div>

        {/* Tabs */}
        <div className="insights-tabs">
          <button 
            className={`tab-btn ${activeTab === 'brands' ? 'active' : ''}`}
            onClick={() => setActiveTab('brands')}
          >
            🚗 Vehicle Brand
          </button>
          <button 
            className={`tab-btn ${activeTab === 'age' ? 'active' : ''}`}
            onClick={() => setActiveTab('age')}
          >
            👤 Age Group
          </button>
          <button 
            className={`tab-btn ${activeTab === 'lifestyle' ? 'active' : ''}`}
            onClick={() => setActiveTab('lifestyle')}
          >
            🚬 Lifestyle
          </button>
          <button 
            className={`tab-btn ${activeTab === 'mileage' ? 'active' : ''}`}
            onClick={() => setActiveTab('mileage')}
          >
            🛣️ Mileage
          </button>
          <button 
            className={`tab-btn ${activeTab === 'vehicle-age' ? 'active' : ''}`}
            onClick={() => setActiveTab('vehicle-age')}
          >
            📅 Vehicle Age
          </button>
          <button 
            className={`tab-btn ${activeTab === 'fuel' ? 'active' : ''}`}
            onClick={() => setActiveTab('fuel')}
          >
            ⛽ Fuel Type
          </button>
          <button 
            className={`tab-btn ${activeTab === 'location' ? 'active' : ''}`}
            onClick={() => setActiveTab('location')}
          >
            📍 Location
          </button>
          <button 
            className={`tab-btn ${activeTab === 'savings' ? 'active' : ''}`}
            onClick={() => setActiveTab('savings')}
          >
            💰 Save Money
          </button>
        </div>

        {/* Tab Content */}
        <div className="insights-content">
          
          {/* TAB 1: BRANDS */}
          {activeTab === 'brands' && insights?.brand_comparison && (
            <motion.div 
              className="tab-content"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="insight-card">
                <h2>{insights.brand_comparison.title}</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={insights.brand_comparison.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="brand" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgPremium" fill="#1E3A8A" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="insight-box">
                  <div className="insight-icon">💡</div>
                  <p>{insights.brand_comparison.insight}</p>
                </div>
                <div className="insight-box savings">
                  <div className="insight-icon">💰</div>
                  <p>Choose economy brands to save ₹1,200-1,500/month</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: AGE */}
          {activeTab === 'age' && insights?.age_vs_premium && (
            <motion.div 
              className="tab-content"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="insight-card">
                <h2>{insights.age_vs_premium.title}</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={insights.age_vs_premium.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageGroup" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgPremium">
                      {insights.age_vs_premium.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="insight-box">
                  <div className="insight-icon">💡</div>
                  <p>{insights.age_vs_premium.insight}</p>
                </div>
                <div className="insight-box savings">
                  <div className="insight-icon">💰</div>
                  <p>Wait until 26 to save ₹600/month on premiums</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: LIFESTYLE */}
          {activeTab === 'lifestyle' && insights?.smoking_impact && (
            <motion.div 
              className="tab-content"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="insight-card">
                <h2>{insights.smoking_impact.title}</h2>
                <div className="chart-row">
                  <ResponsiveContainer width="50%" height={300}>
                    <PieChart>
                      <Pie
                        data={insights.smoking_impact.data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.type}: ₹${entry.avgPremium}`}
                        outerRadius={100}
                        dataKey="avgPremium"
                      >
                        {insights.smoking_impact.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#10B981' : '#EF4444'} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="comparison-stats">
                    {insights.smoking_impact.data.map((item, index) => (
                      <div key={index} className="stat-item">
                        <h3 style={{color: index === 0 ? '#10B981' : '#EF4444'}}>{item.type}</h3>
                        <div className="stat-value">₹{item.avgPremium.toFixed(0)}/month</div>
                        <div className="stat-percentage">{item.percentage}% of customers</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="insight-box warning">
                  <div className="insight-icon">💡</div>
                  <p>{insights.smoking_impact.insight}</p>
                </div>
                <div className="insight-box savings">
                  <div className="insight-icon">💰</div>
                  <p>Quit smoking to save ₹550/month on insurance</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: MILEAGE */}
          {activeTab === 'mileage' && insights?.mileage_impact && (
            <motion.div 
              className="tab-content"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="insight-card">
                <h2>{insights.mileage_impact.title}</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={insights.mileage_impact.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgPremium" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="insight-box">
                  <div className="insight-icon">💡</div>
                  <p>{insights.mileage_impact.insight}</p>
                </div>
                <div className="insight-box savings">
                  <div className="insight-icon">💰</div>
                  <p>Reduce annual mileage to save up to ₹450/month</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: VEHICLE AGE */}
          {activeTab === 'vehicle-age' && insights?.vehicle_age_impact && (
            <motion.div 
              className="tab-content"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="insight-card">
                <h2>{insights.vehicle_age_impact.title}</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={insights.vehicle_age_impact.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="avgPremium" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="insight-box">
                  <div className="insight-icon">💡</div>
                  <p>{insights.vehicle_age_impact.insight}</p>
                </div>
                <div className="insight-box savings">
                  <div className="insight-icon">💰</div>
                  <p>Buy a 5-year-old vehicle to save ₹200/month</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 6: FUEL TYPE */}
          {activeTab === 'fuel' && insights?.fuel_type_comparison && (
            <motion.div 
              className="tab-content"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="insight-card">
                <h2>{insights.fuel_type_comparison.title}</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={insights.fuel_type_comparison.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fuel" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgPremium">
                      {insights.fuel_type_comparison.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fuel === 'Electric' ? '#10B981' : COLORS[index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="insight-box">
                  <div className="insight-icon">💡</div>
                  <p>{insights.fuel_type_comparison.insight}</p>
                </div>
                <div className="insight-box savings">
                  <div className="insight-icon">🌱</div>
                  <p>Go electric and save ₹100-200/month while helping the environment</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 7: LOCATION */}
          {activeTab === 'location' && insights?.region_comparison && (
            <motion.div 
              className="tab-content"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="insight-card">
                <h2>{insights.region_comparison.title}</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={insights.region_comparison.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgPremium" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="insight-box">
                  <div className="insight-icon">💡</div>
                  <p>{insights.region_comparison.insight}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 8: SAVINGS TIPS */}
          {activeTab === 'savings' && insights?.savings_calculator && (
            <motion.div 
              className="tab-content"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="insight-card">
                <h2>{insights.savings_calculator.title}</h2>
                <div className="savings-grid">
                  {insights.savings_calculator.tips.map((tip, index) => (
                    <div key={index} className="savings-tip-card">
                      <div className="tip-number">{index + 1}</div>
                      <h3>{tip.tip}</h3>
                      <div className="savings-amount">{tip.savings}</div>
                    </div>
                  ))}
                </div>
                <div className="total-savings-box">
                  <h3>💰 Total Potential Savings</h3>
                  <div className="total-amount">Up to ₹2,550/month!</div>
                  <p>Apply multiple tips to maximize your savings</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Insights;
