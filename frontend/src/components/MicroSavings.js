import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function MicroSavings({ user }) {
  const [savingsData] = useState({
    totalSavings: 1120,
    thisWeek: 140,
    interestEarned: 45,
    goal: 5000
  });

  const [chartData] = useState([
    { week: 'W1', savings: 140 },
    { week: 'W2', savings: 280 },
    { week: 'W3', savings: 420 },
    { week: 'W4', savings: 560 },
    { week: 'W5', savings: 700 },
    { week: 'W6', savings: 840 },
    { week: 'W7', savings: 980 },
    { week: 'W8', savings: 1120 }
  ]);

  const progressPercentage = (savingsData.totalSavings / savingsData.goal) * 100;

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 style={{ marginBottom: '20px' }}>💰 Micro-Savings Wallet</h2>
      
      <div style={{ 
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '16px',
        marginBottom: '20px'
      }}>
        <p style={{ fontSize: '16px', opacity: 0.9, marginBottom: '10px' }}>Total Savings</p>
        <h1 style={{ fontSize: '48px', margin: '10px 0' }}>₹{savingsData.totalSavings}</h1>
        <p style={{ fontSize: '14px', opacity: 0.9 }}>
          +₹{savingsData.interestEarned} interest earned (4% annual)
        </p>
      </div>

      <div className="info-grid" style={{ marginBottom: '20px' }}>
        <div className="info-item">
          <div className="label">This Week</div>
          <div className="value" style={{ color: '#11998e' }}>+₹{savingsData.thisWeek}</div>
        </div>
        <div className="info-item">
          <div className="label">Goal Progress</div>
          <div className="value" style={{ color: '#667eea' }}>{progressPercentage.toFixed(0)}%</div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontWeight: 600 }}>Goal: ₹{savingsData.goal}</span>
          <span style={{ color: '#666' }}>₹{savingsData.goal - savingsData.totalSavings} to go</span>
        </div>
        <div className="progress-bar" style={{ height: '16px' }}>
          <motion.div 
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1 }}
            style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '15px' }}>📈 Savings Growth</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="savings" 
              stroke="#11998e" 
              strokeWidth={3}
              dot={{ fill: '#11998e', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
        <h4 style={{ marginBottom: '15px' }}>💡 How It Works</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
          <li>10% of your unused coverage is automatically saved each week</li>
          <li>Earn 4% annual interest on your savings</li>
          <li>Withdraw anytime after 12 weeks or in emergencies</li>
          <li>Build your financial safety net while staying protected</li>
        </ul>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <motion.button
          className="btn-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Withdraw
        </motion.button>
        <motion.button
          className="btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Set Goal
        </motion.button>
      </div>
    </motion.div>
  );
}

export default MicroSavings;
