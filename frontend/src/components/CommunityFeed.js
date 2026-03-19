import React, { useState, useEffect } from 'react';

const FEEDS = [
  { avatar: '🧑‍💼', area: 'Andheri West', city: 'Mumbai', msg: 'Amazon Flex claim of ₹600 auto-approved due to heavy rain 🎉 — parcels were undeliverable', time: '2 min ago', type: 'payout' },
  { avatar: '👨‍💼', area: 'Koramangala', city: 'Bengaluru', msg: 'AQI hit 280 — outdoor delivery unsafe. Shadowfax has paused zone assignments', time: '5 min ago', type: 'alert' },
  { avatar: '👩‍💼', area: 'Connaught Place', city: 'Delhi', msg: 'Just renewed Gig Shield for ₹100 — protected for another week of Flipkart deliveries!', time: '9 min ago', type: 'renewal' },
  { avatar: '🧑', area: 'Hitech City', city: 'Hyderabad', msg: 'Delhivery app outage — checking if parametric auto-claim will trigger', time: '13 min ago', type: 'alert' },
  { avatar: '👩', area: 'Anna Nagar', city: 'Chennai', msg: 'Safety streak hit 12 weeks 💎 Unlocked 15% premium discount on my Amazon Flex policy!', time: '18 min ago', type: 'streak' }
];

const POOL_STATS = [
  { label: 'Paid out this week (E-Commerce riders)', value: '₹2,49,400', icon: '💸', color: '#10b981' },
  { label: 'Auto-claims processed today', value: '847', icon: '⚡', color: '#2563eb' },
  { label: 'E-Commerce riders protected', value: '26,847', icon: '📦', color: '#7c3aed' }
];

const TYPE_CONFIG = {
  payout:  { badge: 'badge-success', icon: '💸' },
  alert:   { badge: 'badge-warning', icon: '⚠️' },
  renewal: { badge: 'badge-info',    icon: '🔄' },
  streak:  { badge: 'badge-purple',  icon: '🏆' }
};

function CommunityFeed({ user }) {
  const [feeds, setFeeds] = useState(FEEDS);
  const [newAlert, setNewAlert] = useState(null);

  // Simulate a new feed item arriving
  useEffect(() => {
    const timer = setTimeout(() => {
      setNewAlert({ avatar: '🧑‍🔧', area: 'Bandra', city: 'Mumbai', msg: 'Road closure lifted on NH-48 — last-mile delivery zones re-opened!', time: 'Just now', type: 'alert' });
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (newAlert) setFeeds(prev => [newAlert, ...prev.slice(0, 4)]);
  }, [newAlert]);

  return (
    <div className="card animate-fadeIn">
      <div className="card-header">
        <h2>🤝 E-Commerce Rider Community</h2>
        <span className="status-badge badge-success">● Live</span>
      </div>

      {/* Pool Stats */}
      <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e3a8a)', borderRadius: 12, padding: 16, marginBottom: 18 }}>
        {POOL_STATS.map(s => (
          <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{s.icon} {s.label}</span>
            <strong style={{ color: s.color, fontSize: 15 }}>{s.value}</strong>
          </div>
        ))}
      </div>

      {/* Feed */}
      <div style={{ fontWeight: 700, fontSize: 13, color: '#64748b', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        Live Activity Feed
      </div>
      {feeds.map((f, i) => {
        const cfg = TYPE_CONFIG[f.type];
        return (
          <div key={i} className="feed-item" style={{ animation: i === 0 && newAlert ? 'slideUp 0.5s ease' : undefined }}>
            <div className="feed-avatar">{f.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: '#1e293b', fontWeight: 500, lineHeight: 1.4 }}>{f.msg}</div>
              <div className="feed-meta">{f.area}, {f.city} · {f.time}</div>
            </div>
            <span className={`status-badge ${cfg.badge}`} style={{ fontSize: 10, flexShrink: 0 }}>
              {cfg.icon}
            </span>
          </div>
        );
      })}

      <div style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 8 }}>
        🔒 All activity is anonymous. No personal data is shared.
      </div>
    </div>
  );
}

export default CommunityFeed;
