import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function StreakRewards({ user }) {
  const [streak, setStreak] = useState(8);
  const [badges, setBadges] = useState({
    fire: { weeks: 4, earned: true, icon: '🔥', name: 'Fire Starter' },
    lightning: { weeks: 8, earned: true, icon: '⚡', name: 'Lightning Bolt' },
    diamond: { weeks: 12, earned: false, icon: '💎', name: 'Diamond Shield' },
    crown: { weeks: 26, earned: false, icon: '👑', name: 'Elite Guardian' }
  });

  const getDiscount = () => {
    if (streak >= 26) return 25;
    if (streak >= 12) return 15;
    if (streak >= 8) return 10;
    if (streak >= 4) return 5;
    return 0;
  };

  const getNextMilestone = () => {
    if (streak < 4) return { weeks: 4, badge: '🔥', discount: 5 };
    if (streak < 8) return { weeks: 8, badge: '⚡', discount: 10 };
    if (streak < 12) return { weeks: 12, badge: '💎', discount: 15 };
    if (streak < 26) return { weeks: 26, badge: '👑', discount: 25 };
    return null;
  };

  const nextMilestone = getNextMilestone();

  return (
    <motion.div 
      className="card gradient-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="streak-container">
        <h2>🎯 Your Safety Streak</h2>
        
        <motion.div
          className="streak-number"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {streak}
        </motion.div>
        
        <p style={{ fontSize: '20px', marginBottom: '20px' }}>
          Weeks Claim-Free!
        </p>

        <div className="progress-bar" style={{ marginBottom: '20px' }}>
          <motion.div 
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${(streak / (nextMilestone?.weeks || 26)) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>

        {nextMilestone && (
          <div style={{ marginBottom: '30px' }}>
            <p style={{ fontSize: '18px' }}>
              Next Milestone: {nextMilestone.weeks} weeks
            </p>
            <p style={{ fontSize: '24px', margin: '10px 0' }}>
              {nextMilestone.badge} Unlock {nextMilestone.discount}% discount!
            </p>
            <p style={{ fontSize: '16px', opacity: 0.9 }}>
              {nextMilestone.weeks - streak} weeks to go
            </p>
          </div>
        )}

        <div className="badge-collection">
          {Object.values(badges).map((badge, index) => (
            <motion.div
              key={index}
              className={`badge-item ${badge.earned ? 'earned' : ''}`}
              whileHover={{ scale: 1.2, rotate: 10 }}
              title={`${badge.name} (${badge.weeks} weeks)`}
            >
              {badge.icon}
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '15px' }}>Current Benefits</h3>
          <div style={{ fontSize: '18px' }}>
            <p>💰 Premium Discount: <strong>₹{getDiscount()}</strong></p>
            <p>🏆 Community Rank: <strong>#47 / 2,847</strong></p>
            <p>⭐ Reputation Score: <strong>95/100</strong></p>
          </div>
        </div>

        <div style={{ marginTop: '20px', fontSize: '14px', opacity: 0.9 }}>
          <p>💡 Keep your streak alive! Renew your policy on time.</p>
        </div>
      </div>
    </motion.div>
  );
}

export default StreakRewards;
