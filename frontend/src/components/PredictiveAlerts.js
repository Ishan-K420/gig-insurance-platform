import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function PredictiveAlerts({ user }) {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'heavy_rain',
      zone: 'Andheri West',
      probability: 0.85,
      expectedTime: 'Tomorrow 2-5 PM',
      severity: 'high',
      icon: '🌧️'
    }
  ]);

  const [showDetails, setShowDetails] = useState(false);

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return '#f5576c';
      case 'medium': return '#f093fb';
      case 'low': return '#38ef7d';
      default: return '#667eea';
    }
  };

  return (
    <AnimatePresence>
      {alerts.length > 0 && (
        <motion.div 
          className="card warning-card"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>⚠️ Predictive Alert</h2>
            <motion.button
              className="btn-secondary"
              style={{ width: 'auto', padding: '10px 20px', fontSize: '14px' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide' : 'Details'}
            </motion.button>
          </div>

          {alerts.map(alert => (
            <div key={alert.id} style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <span style={{ fontSize: '48px' }}>{alert.icon}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 5px 0' }}>Heavy Rain Expected</h3>
                  <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>
                    {alert.zone} • {alert.expectedTime}
                  </p>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px', borderRadius: '12px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Probability</span>
                  <strong>{(alert.probability * 100).toFixed(0)}%</strong>
                </div>
                <div className="progress-bar">
                  <motion.div 
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${alert.probability * 100}%` }}
                    transition={{ duration: 1 }}
                    style={{ background: getSeverityColor(alert.severity) }}
                  />
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px', borderRadius: '12px' }}>
                <p style={{ margin: '0 0 10px 0', fontWeight: 600 }}>✅ You're Protected!</p>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
                  Your policy covers this disruption. If it happens, you'll automatically receive ₹200/hour.
                </p>
              </div>

              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ marginTop: '20px' }}
                >
                  <h4 style={{ marginBottom: '15px' }}>📍 Alternative Zones (Lower Risk)</h4>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justify: 'space-between' }}>
                        <span>🟢 Powai</span>
                        <span>8km away • Low risk</span>
                      </div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justify: 'space-between' }}>
                        <span>🟡 Bandra</span>
                        <span>5km away • Medium risk</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px' }}>
                    <h4 style={{ marginBottom: '10px' }}>💡 Boost Your Coverage</h4>
                    <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                      Get ₹500 extra coverage for tomorrow for just ₹20
                    </p>
                    <button className="btn" style={{ width: 'auto', padding: '10px 20px', fontSize: '14px' }}>
                      Add Temporary Boost
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PredictiveAlerts;
