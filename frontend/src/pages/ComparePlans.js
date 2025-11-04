import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ComparePlans.css';

function ComparePlans() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const plans = [
    {
      name: 'BASIC',
      price: 599,
      yearlyPrice: 6470,
      popular: false,
      features: {
        liability: true,
        collision: false,
        comprehensive: false,
        roadside: false,
        rental: false,
        zeroDepreciation: false,
        engineProtection: false,
        personalAccident: false,
        cashlessGarages: '500+'
      },
      bestFor: 'Budget-conscious drivers',
      color: '#6B7280'
    },
    {
      name: 'STANDARD',
      price: 999,
      yearlyPrice: 10790,
      popular: true,
      features: {
        liability: true,
        collision: true,
        comprehensive: false,
        roadside: true,
        rental: false,
        zeroDepreciation: false,
        engineProtection: false,
        personalAccident: true,
        cashlessGarages: '3000+'
      },
      bestFor: 'Most drivers',
      color: '#1E3A8A'
    },
    {
      name: 'PREMIUM',
      price: 1599,
      yearlyPrice: 17270,
      popular: false,
      features: {
        liability: true,
        collision: true,
        comprehensive: true,
        roadside: true,
        rental: true,
        zeroDepreciation: true,
        engineProtection: true,
        personalAccident: true,
        cashlessGarages: '5000+'
      },
      bestFor: 'Maximum protection',
      color: '#10B981'
    }
  ];

  const featureRows = [
    { key: 'liability', label: 'Liability Coverage' },
    { key: 'collision', label: 'Collision Coverage' },
    { key: 'comprehensive', label: 'Comprehensive Coverage' },
    { key: 'roadside', label: '24/7 Roadside Assistance' },
    { key: 'rental', label: 'Rental Car Coverage' },
    { key: 'zeroDepreciation', label: 'Zero Depreciation' },
    { key: 'engineProtection', label: 'Engine Protection' },
    { key: 'personalAccident', label: 'Personal Accident Cover' },
    { key: 'cashlessGarages', label: 'Cashless Garages', isText: true }
  ];

  return (
    <div className="compare-plans">
      <div className="container">
        <motion.div 
          className="compare-header"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="page-title">Insurance Plan Comparison</h1>
          <p className="page-subtitle">Explore different coverage tiers and their features</p>
        </motion.div>

        {/* Mobile Cards View */}
        <div className="plans-cards-mobile">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`plan-card-mobile ${plan.popular ? 'popular' : ''}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
            >
              {plan.popular && <div className="popular-badge">⭐ MOST POPULAR</div>}
              
              <div className="plan-header-mobile">
                <h2 style={{ color: plan.color }}>{plan.name}</h2>
                <div className="plan-pricing">
                  <div className="monthly-price">₹{plan.price}<span>/month</span></div>
                  <div className="yearly-price">₹{plan.yearlyPrice}/year</div>
                </div>
              </div>

              <div className="plan-features-mobile">
                <h3>Features Included:</h3>
                {featureRows.map((feature, idx) => {
                  const value = plan.features[feature.key];
                  if (feature.isText) {
                    return (
                      <div key={idx} className="feature-row">
                        <span>{feature.label}:</span>
                        <span className="feature-value">{value}</span>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="feature-row">
                      <span>{feature.label}</span>
                      <span className={value ? 'check' : 'cross'}>
                        {value ? '✅' : '❌'}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="plan-best-for">
                <strong>Best For:</strong> {plan.bestFor}
              </div>

              <Link to="/get-quote" className="btn btn-primary">
                Select {plan.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop Table View */}
        <motion.div 
          className="plans-table-desktop"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-column">Features</th>
                {plans.map((plan, index) => (
                  <th key={index} className={plan.popular ? 'popular-column' : ''}>
                    {plan.popular && <div className="popular-badge-table">⭐ MOST POPULAR</div>}
                    <div className="plan-name" style={{ color: plan.color }}>{plan.name}</div>
                    <div className="plan-price">₹{plan.price}<span>/month</span></div>
                    <div className="plan-yearly">₹{plan.yearlyPrice}/year</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureRows.map((feature, idx) => (
                <tr key={idx}>
                  <td className="feature-label">{feature.label}</td>
                  {plans.map((plan, planIdx) => {
                    const value = plan.features[feature.key];
                    return (
                      <td key={planIdx} className="feature-value">
                        {feature.isText ? (
                          <span className="text-value">{value}</span>
                        ) : value ? (
                          <span className="check-icon">✅</span>
                        ) : (
                          <span className="cross-icon">❌</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="best-for-row">
                <td className="feature-label"><strong>Best For:</strong></td>
                {plans.map((plan, planIdx) => (
                  <td key={planIdx} className="best-for-cell">
                    {plan.bestFor}
                  </td>
                ))}
              </tr>
              <tr className="action-row">
                <td></td>
                {plans.map((plan, planIdx) => (
                  <td key={planIdx}>
                    <Link to="/get-quote" className="btn btn-primary">
                      Select {plan.name}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          className="additional-info"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🛡️</div>
              <h3>All Plans Include</h3>
              <ul>
                <li>Third-party liability coverage</li>
                <li>Easy claims process</li>
                <li>Online policy management</li>
                <li>No hidden charges</li>
                <li>Flexible payment options</li>
              </ul>
            </div>

            <div className="info-card">
              <div className="info-icon">⚡</div>
              <h3>Why Upgrade?</h3>
              <ul>
                <li>More comprehensive coverage</li>
                <li>Higher claim limits</li>
                <li>Additional benefits & add-ons</li>
                <li>Better peace of mind</li>
                <li>Premium support</li>
              </ul>
            </div>

            <div className="info-card">
              <div className="info-icon">💰</div>
              <h3>Save More</h3>
              <ul>
                <li>10% discount on annual payment</li>
                <li>No-claim bonus up to 50%</li>
                <li>Multi-vehicle discounts</li>
                <li>Loyalty rewards</li>
                <li>Referral bonuses</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="compare-cta"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2>Not Sure Which Plan to Choose?</h2>
          <p>Get a personalized quote based on your specific needs</p>
          <Link to="/get-quote" className="btn btn-secondary btn-large">
            Get Custom Quote →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default ComparePlans;
