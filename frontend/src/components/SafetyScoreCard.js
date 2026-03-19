import React, { useState, useEffect } from 'react';

const SCORE_FACTORS = [
  { label: 'Claim-Free Weeks', points: 32, max: 40, icon: '🛡️', detail: '8 weeks × 4 pts' },
  { label: 'Policy Renewals on Time', points: 20, max: 20, icon: '⏰', detail: 'All 8 renewals on time' },
  { label: 'Hours Consistency', points: 18, max: 25, icon: '📊', detail: '42-58h/week range' },
  { label: 'Working in Safe Zones', points: 15, max: 15, icon: '📍', detail: 'AQI <150 compliance' }
];

const DISCOUNT_TIERS = [
  { score: 90, discount: 25, label: 'Platinum', color: '#7c3aed', icon: '💎' },
  { score: 75, discount: 15, label: 'Gold',     color: '#f59e0b', icon: '🥇' },
  { score: 60, discount: 10, label: 'Silver',   color: '#64748b', icon: '🥈' },
  { score: 45, discount: 5,  label: 'Bronze',   color: '#ea580c', icon: '🥉' }
];

function SafetyScoreCard({ user }) {
  const [animScore, setAnimScore] = useState(0);
  const totalScore = SCORE_FACTORS.reduce((s, f) => s + f.points, 0); // 85

  useEffect(() => {
    const step = totalScore / 40;
    let cur = 0;
    const iv = setInterval(() => {
      cur = Math.min(cur + step, totalScore);
      setAnimScore(Math.round(cur));
      if (cur >= totalScore) clearInterval(iv);
    }, 30);
    return () => clearInterval(iv);
  }, [totalScore]);

  const currentTier = DISCOUNT_TIERS.find(t => totalScore >= t.score) || DISCOUNT_TIERS[DISCOUNT_TIERS.length - 1];
  const nextTier = DISCOUNT_TIERS.find(t => t.score > totalScore);

  const R = 54, C = 2 * Math.PI * R;
  const arc = (C * animScore) / 100;
  const scoreColor = totalScore >= 80 ? '#10b981' : totalScore >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <div className="card animate-fadeIn">
      <div className="card-header">
        <h2>🏆 Safety Score</h2>
        <span style={{ fontSize: 22 }}>{currentTier.icon}</span>
      </div>

      {/* Score Ring */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
        <div className="score-ring" style={{ width: 130, height: 130 }}>
          <svg width="130" height="130">
            <circle cx="65" cy="65" r={R} fill="none" stroke="#e2e8f0" strokeWidth="12"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '65px 65px' }} />
            <circle cx="65" cy="65" r={R} fill="none" stroke={scoreColor} strokeWidth="12"
              strokeDasharray={`${arc} ${C}`}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '65px 65px', transition: 'stroke-dasharray 0.05s linear' }} />
          </svg>
          <div className="score-center">
            <div className="score-number" style={{ fontSize: 36, color: scoreColor }}>{animScore}</div>
            <div className="score-label">/ 100</div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 20, color: currentTier.color, marginBottom: 4 }}>
            {currentTier.icon} {currentTier.label}
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#10b981' }}>{currentTier.discount}% off</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>Premium discount applied</div>
          {nextTier && (
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>
              {nextTier.score - totalScore} pts to {nextTier.label} {nextTier.icon}
            </div>
          )}
        </div>
      </div>

      {/* Score Factors */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: '#64748b', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.4 }}>
          Score Breakdown
        </div>
        {SCORE_FACTORS.map(f => (
          <div key={f.label} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>{f.icon}</span>
                <span style={{ fontWeight: 600 }}>{f.label}</span>
              </span>
              <span style={{ color: '#2563eb', fontWeight: 700 }}>{f.points}/{f.max}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="progress-bar" style={{ flex: 1, margin: 0 }}>
                <div className="progress-fill" style={{ width: `${(f.points/f.max)*100}%` }} />
              </div>
              <span style={{ fontSize: 10, color: '#94a3b8', minWidth: 70 }}>{f.detail}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tiers */}
      <div style={{ background: '#f8fafc', borderRadius: 12, padding: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>🎯 Discount Tiers</div>
        {DISCOUNT_TIERS.map(t => (
          <div key={t.label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '7px 10px', borderRadius: 8, marginBottom: 4,
            background: totalScore >= t.score ? `${t.color}12` : 'transparent',
            border: `1px solid ${totalScore >= t.score ? t.color+'30' : '#e2e8f0'}`
          }}>
            <span style={{ fontSize: 13, fontWeight: totalScore >= t.score ? 700 : 400, color: totalScore >= t.score ? t.color : '#94a3b8' }}>
              {t.icon} {t.label} (≥{t.score} pts)
            </span>
            <strong style={{ color: totalScore >= t.score ? t.color : '#94a3b8' }}>{t.discount}% off</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SafetyScoreCard;
