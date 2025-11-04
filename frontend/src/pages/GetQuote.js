import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './GetQuote.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function GetQuote() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    age: '',
    sex: 'male',
    email: '',
    phone: '',
    smoker: 'no',
    region: 'northeast',
    // Step 2
    vehicle_make: '',
    vehicle_model: '',
    vehicle_year: '',
    annual_mileage: 15000,
    fuel_type: 'Petrol',
    usage_type: 'Personal',
    // Step 3
    plan: 'standard',
    addons: []
  });
  const [quote, setQuote] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        addons: checked 
          ? [...prev.addons, value]
          : prev.addons.filter(a => a !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const getQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/get-quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: parseInt(formData.age),
          sex: formData.sex,
          smoker: formData.smoker,
          vehicle_make: formData.vehicle_make,
          vehicle_year: parseInt(formData.vehicle_year),
          annual_mileage: parseInt(formData.annual_mileage),
          usage_type: formData.usage_type,
          fuel_type: formData.fuel_type,
          region: formData.region
        })
      });
      const data = await response.json();
      setQuote(data);
      setStep(4);
    } catch (error) {
      console.error('Error getting quote:', error);
      alert('Error getting quote. Please try again.');
    }
    setLoading(false);
  };

  const progressPercentage = (step / 4) * 100;

  const pieData = quote ? [
    { name: 'Base', value: quote.breakdown.base },
    { name: 'Vehicle', value: quote.breakdown.vehicle },
    { name: 'Add-ons', value: quote.breakdown.addons },
    { name: 'Taxes', value: quote.breakdown.taxes }
  ] : [];

  const COLORS = ['#1E3A8A', '#3B82F6', '#10B981', '#F59E0B'];

  return (
    <div className="get-quote">
      <div className="container">
        <div className="quote-header">
          <h1 className="page-title">Get Your Instant Quote</h1>
          <p className="page-subtitle">Fill in your details and get AI-powered premium in seconds</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="progress-steps">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-circle">1</div>
              <span>Personal</span>
            </div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-circle">2</div>
              <span>Vehicle</span>
            </div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-circle">3</div>
              <span>Coverage</span>
            </div>
            <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>
              <div className="step-circle">4</div>
              <span>Quote</span>
            </div>
          </div>
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <motion.div 
            className="form-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="form-title">Personal Information</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Age *</label>
                <input 
                  type="number" 
                  name="age" 
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="25"
                  min="18"
                  max="80"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Gender *</label>
              <div className="radio-group">
                <label className="radio-card">
                  <input 
                    type="radio" 
                    name="sex" 
                    value="male"
                    checked={formData.sex === 'male'}
                    onChange={handleChange}
                  />
                  <span className="radio-icon">👨</span>
                  <span>Male</span>
                </label>
                <label className="radio-card">
                  <input 
                    type="radio" 
                    name="sex" 
                    value="female"
                    checked={formData.sex === 'female'}
                    onChange={handleChange}
                  />
                  <span className="radio-icon">👩</span>
                  <span>Female</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  name="smoker" 
                  checked={formData.smoker === 'yes'}
                  onChange={(e) => setFormData({...formData, smoker: e.target.checked ? 'yes' : 'no'})}
                />
                <span>I am a smoker</span>
                <span className="warning-badge">⚠️ May increase premium</span>
              </label>
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" onClick={nextStep}>
                Next: Vehicle Info →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Vehicle Info */}
        {step === 2 && (
          <motion.div 
            className="form-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="form-title">Vehicle Information</h2>
            
            <div className="form-group">
              <label>Vehicle Brand *</label>
              <select 
                name="vehicle_make" 
                value={formData.vehicle_make}
                onChange={handleChange}
                required
              >
                <option value="">Select Brand</option>
                <optgroup label="Economy">
                  <option value="Maruti">Maruti</option>
                  <option value="Tata">Tata</option>
                  <option value="Hyundai">Hyundai</option>
                </optgroup>
                <optgroup label="Mid-Range">
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Ford">Ford</option>
                  <option value="Nissan">Nissan</option>
                  <option value="Chevrolet">Chevrolet</option>
                </optgroup>
                <optgroup label="Luxury">
                  <option value="BMW">BMW</option>
                  <option value="Mercedes">Mercedes</option>
                  <option value="Audi">Audi</option>
                </optgroup>
              </select>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Model</label>
                <input 
                  type="text" 
                  name="vehicle_model" 
                  value={formData.vehicle_model}
                  onChange={handleChange}
                  placeholder="e.g., Camry, City, Swift"
                />
              </div>

              <div className="form-group">
                <label>Year *</label>
                <select 
                  name="vehicle_year" 
                  value={formData.vehicle_year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Year</option>
                  {[...Array(10)].map((_, i) => {
                    const year = 2024 - i;
                    return <option key={year} value={year}>{year}</option>
                  })}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Annual Mileage: {formData.annual_mileage.toLocaleString()} km</label>
              <input 
                type="range" 
                name="annual_mileage" 
                min="5000"
                max="30000"
                step="1000"
                value={formData.annual_mileage}
                onChange={handleChange}
                className="slider"
              />
              <div className="slider-labels">
                <span>5,000 km</span>
                <span>30,000 km</span>
              </div>
            </div>

            <div className="form-group">
              <label>Fuel Type *</label>
              <div className="button-group">
                <button 
                  type="button"
                  className={`option-btn ${formData.fuel_type === 'Petrol' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, fuel_type: 'Petrol'})}
                >
                  ⛽ Petrol
                </button>
                <button 
                  type="button"
                  className={`option-btn ${formData.fuel_type === 'Diesel' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, fuel_type: 'Diesel'})}
                >
                  🚜 Diesel
                </button>
                <button 
                  type="button"
                  className={`option-btn ${formData.fuel_type === 'Electric' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, fuel_type: 'Electric'})}
                >
                  🔋 Electric
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Usage Type *</label>
              <div className="usage-cards">
                <label className={`usage-card ${formData.usage_type === 'Personal' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="usage_type" 
                    value="Personal"
                    checked={formData.usage_type === 'Personal'}
                    onChange={handleChange}
                  />
                  <div className="usage-icon">🚗</div>
                  <div className="usage-title">Personal</div>
                  <div className="usage-desc">Daily commute & family use</div>
                </label>

                <label className={`usage-card ${formData.usage_type === 'Commercial' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="usage_type" 
                    value="Commercial"
                    checked={formData.usage_type === 'Commercial'}
                    onChange={handleChange}
                  />
                  <div className="usage-icon">🚚</div>
                  <div className="usage-title">Commercial</div>
                  <div className="usage-desc">Business & deliveries</div>
                </label>

                <label className={`usage-card ${formData.usage_type === 'Ride-share' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="usage_type" 
                    value="Ride-share"
                    checked={formData.usage_type === 'Ride-share'}
                    onChange={handleChange}
                  />
                  <div className="usage-icon">🚕</div>
                  <div className="usage-title">Ride-share</div>
                  <div className="usage-desc">Uber, Ola, etc.</div>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn-outline" onClick={prevStep}>
                ← Back
              </button>
              <button className="btn btn-primary" onClick={nextStep}>
                Next: Coverage →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Coverage */}
        {step === 3 && (
          <motion.div 
            className="form-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="form-title">Choose Your Coverage</h2>
            
            <div className="plans-grid">
              <label className={`plan-card ${formData.plan === 'basic' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="plan" 
                  value="basic"
                  checked={formData.plan === 'basic'}
                  onChange={handleChange}
                />
                <div className="plan-header">
                  <h3>BASIC</h3>
                  <div className="plan-price">₹599/month</div>
                </div>
                <ul className="plan-features">
                  <li>✓ Liability Coverage</li>
                  <li>✓ Basic Support</li>
                  <li>✗ Collision Coverage</li>
                  <li>✗ Roadside Assistance</li>
                </ul>
              </label>

              <label className={`plan-card popular ${formData.plan === 'standard' ? 'active' : ''}`}>
                <div className="popular-badge">⭐ POPULAR</div>
                <input 
                  type="radio" 
                  name="plan" 
                  value="standard"
                  checked={formData.plan === 'standard'}
                  onChange={handleChange}
                />
                <div className="plan-header">
                  <h3>STANDARD</h3>
                  <div className="plan-price">₹999/month</div>
                </div>
                <ul className="plan-features">
                  <li>✓ Everything in Basic</li>
                  <li>✓ Collision Coverage</li>
                  <li>✓ 24/7 Support</li>
                  <li>✓ Roadside Assistance</li>
                </ul>
              </label>

              <label className={`plan-card ${formData.plan === 'premium' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="plan" 
                  value="premium"
                  checked={formData.plan === 'premium'}
                  onChange={handleChange}
                />
                <div className="plan-header">
                  <h3>PREMIUM</h3>
                  <div className="plan-price">₹1,599/month</div>
                </div>
                <ul className="plan-features">
                  <li>✓ Everything in Standard</li>
                  <li>✓ Zero Depreciation</li>
                  <li>✓ Engine Protection</li>
                  <li>✓ Rental Car Coverage</li>
                </ul>
              </label>
            </div>

            <div className="form-actions">
              <button className="btn btn-outline" onClick={prevStep}>
                ← Back
              </button>
              <button className="btn btn-primary" onClick={getQuote} disabled={loading}>
                {loading ? 'Getting Quote...' : 'Get My Quote →'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Quote Results */}
        {step === 4 && quote && (
          <motion.div 
            className="quote-results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="quote-main-card">
              <h2 className="quote-title">Your Estimated Premium</h2>
              
              <div className="quote-amount">
                <div className="monthly-premium">
                  <span className="currency">₹</span>
                  <span className="amount">{quote.monthlyPremium.toFixed(2)}</span>
                  <span className="period">/month</span>
                </div>
                <div className="yearly-premium">
                  ₹{quote.yearlyPremium.toFixed(2)}/year with annual discount
                </div>
              </div>

              <div className="quote-breakdown">
                <h3>Cost Breakdown</h3>
                <div className="breakdown-container">
                  <div className="breakdown-chart">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="breakdown-legend">
                    <div className="legend-item">
                      <span className="legend-color" style={{background: COLORS[0]}}></span>
                      <span>Base: {((quote.breakdown.base / quote.monthlyPremium) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color" style={{background: COLORS[1]}}></span>
                      <span>Vehicle: {((quote.breakdown.vehicle / quote.monthlyPremium) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color" style={{background: COLORS[2]}}></span>
                      <span>Add-ons: {((quote.breakdown.addons / quote.monthlyPremium) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color" style={{background: COLORS[3]}}></span>
                      <span>Taxes: {((quote.breakdown.taxes / quote.monthlyPremium) * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="quote-details-grid">
              <div className="detail-card">
                <h3>What's Included</h3>
                <ul className="included-features">
                  <li>✅ {quote.features.liability}</li>
                  <li>✅ {quote.features.collision}</li>
                  <li>✅ {quote.features.roadside}</li>
                  <li>✅ {quote.features.cashless}</li>
                  <li>✅ {quote.features.accident}</li>
                </ul>
              </div>

              <div className="detail-card">
                <h3>Why This Price?</h3>
                <div className="price-factors">
                  {quote.factors.map((factor, index) => (
                    <div key={index} className={`factor-item ${factor.type}`}>
                      <span className="factor-name">{factor.factor}</span>
                      <span className="factor-impact">{factor.impact}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-card comparison-card">
                <h3>How You Compare</h3>
                <div className="comparison-message">{quote.comparison.message}</div>
                <div className="percentile-bar">
                  <div 
                    className="percentile-fill" 
                    style={{width: `${quote.comparison.percentile}%`}}
                  ></div>
                  <div 
                    className="percentile-marker" 
                    style={{left: `${quote.comparison.percentile}%`}}
                  >
                    You
                  </div>
                </div>
                <div className="similar-profiles">
                  <p><strong>Similar profiles pay:</strong></p>
                  <p>{quote.comparison.similarProfiles.range}</p>
                  <p>Average: ₹{quote.comparison.similarProfiles.average}/month</p>
                </div>
              </div>
            </div>

            <div className="quote-actions">
              <button className="btn btn-primary btn-large">
                Buy Now - Proceed to Payment
              </button>
              <button className="btn btn-secondary btn-large">
                Email Quote - Save for Later
              </button>
              <button className="btn btn-outline" onClick={() => setStep(1)}>
                Modify Details
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default GetQuote;
