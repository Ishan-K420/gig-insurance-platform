import React, { useEffect, useState } from 'react'; // E-Commerce delivery risk index

const PLATFORM_RISK = {
  amazon:    58,
  flipkart:  55,
  shadowfax: 62,
  delhivery: 60,
  meesho:    52,
  ecom:      56
};

const CITY_RISK = {
  Mumbai: 75, Delhi: 71, Bangalore: 52, Hyderabad: 55,
  Chennai: 60, Pune: 48, Kolkata: 66, Ahmedabad: 50, Jaipur: 44
};

function RiskGauge({ value, max = 100, color }) {
  const R = 46, C = 2 * Math.PI * R;
  const arc = (C * value) / max;
  return (
    <svg width="110" height="110">
      <circle cx="55" cy="55" r={R} fill="none" stroke="#e2e8f0" strokeWidth="10"
        style={{ transform: 'rotate(-90deg)', transformOrigin: '55px 55px' }} />
      <circle cx="55" cy="55" r={R} fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={`${arc} ${C}`}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '55px 55px', transition: 'stroke-dasharray 1s ease' }} />
      <text x="55" y="55" textAnchor="middle" dominantBaseline="middle"
        style={{ fontWeight: 900, fontSize: 22, fill: color }}>{value}</text>
      <text x="55" y="70" textAnchor="middle" dominantBaseline="middle"
        style={{ fontSize: 9, fill: '#94a3b8' }}>Risk Score</text>
    </svg>
  );
}

function AIRiskPanel({ user }) {
  const [premium, setPremium] = useState(null);

  useEffect(() => {
    const platform = (user?.platform || 'amazon').toLowerCase();
    const city = user?.city || 'Mumbai';
    const hours = Number(user?.weeklyHours) || 50;

    const platformRisk = PLATFORM_RISK[platform] || 56;
    const cityRisk = CITY_RISK[city] || 55;
    const hoursRisk = Math.min(hours / 80 * 30, 30);
    const compositeRisk = Math.round((platformRisk * 0.35 + cityRisk * 0.35 + hoursRisk * 0.3));

    const basePremium = 80;
    const locationAdj = Math.round(cityRisk * 0.12);
    const hoursAdj = Math.round(hoursRisk * 0.25);
    const streakDiscount = 10;
    const total = basePremium + locationAdj + hoursAdj - streakDiscount;

    const color = compositeRisk > 65 ? '#ef4444' : compositeRisk > 45 ? '#f59e0b' : '#10b981';
    const riskLabel = compositeRisk > 65 ? 'High' : compositeRisk > 45 ? 'Moderate' : 'Low';

    setPremium({ compositeRisk, platformRisk, cityRisk, hoursAdj: Math.round(hoursRisk), basePremium, locationAdj, streakDiscount, total, color, riskLabel });
  }, [user]);

  if (!premium) return <div className="spinner" />;

  const factors = [
    { label: 'Platform Risk', desc: `${user?.platform || 'Amazon Flex'} delivery risk index`, score: premium.platformRisk, max: 100, color: '#7c3aed' },
    { label: 'City Risk', desc: `${user?.city || 'Mumbai'} weather & disruption index`, score: premium.cityRisk, max: 100, color: '#2563eb' },
    { label: 'Delivery Hours', desc: `${user?.weeklyHours || 50}h/week exposure factor`, score: premium.hoursAdj, max: 30, color: '#f59e0b' }
  ];

  return (
    <div className="card animate-fadeIn">
      <div className="card-header">
        <h2>🤖 AI Risk Assessment</h2>
        <span className={`status-badge ${premium.compositeRisk > 65 ? 'badge-danger' : premium.compositeRisk > 45 ? 'badge-warning' : 'badge-success'}`}>
          {premium.riskLabel} Risk
        </span>
      </div>

      {/* Risk gauge + premium */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
        <RiskGauge value={premium.compositeRisk} color={premium.color} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700, marginBottom: 4 }}>WEEKLY PREMIUM</div>
          <div style={{ fontSize: 36, fontWeight: 900, color: '#2563eb' }}>₹{premium.total}</div>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>AI-optimized weekly rate</div>
        </div>
      </div>

      {/* Risk Factors */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: '#64748b', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Risk Factors
        </div>
        {factors.map(f => (
          <div key={f.label} className="risk-factor">
            <div className="risk-dot" style={{ background: f.color }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                <strong>{f.label}</strong>
                <span style={{ color: f.color, fontWeight: 700 }}>{f.score}/{f.max}</span>
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>{f.desc}</div>
              <div className="progress-bar" style={{ height: 5, margin: 0 }}>
                <div className="progress-fill" style={{ width: `${(f.score/f.max)*100}%`, background: f.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Breakdown */}
      <div style={{ background: '#f8fafc', borderRadius: 12, padding: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>💰 Premium Breakdown</div>
        {[
          { label: 'Base premium', value: `₹${premium.basePremium}`, color: '#475569' },
          { label: `${user?.city || 'Mumbai'} location risk`, value: `+₹${premium.locationAdj}`, color: '#f59e0b' },
          { label: `Hours adjustment`, value: `+₹${premium.hoursAdj}`, color: '#7c3aed' },
          { label: 'Claim-free streak (8 weeks)', value: `–₹${premium.streakDiscount}`, color: '#10b981' }
        ].map(r => (
          <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
            <span style={{ color: '#64748b' }}>{r.label}</span>
            <strong style={{ color: r.color }}>{r.value}</strong>
          </div>
        ))}
        <div style={{ borderTop: '1.5px solid #e2e8f0', marginTop: 8, paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
          <strong style={{ fontSize: 15 }}>Total</strong>
          <strong style={{ fontSize: 18, color: '#2563eb' }}>₹{premium.total}</strong>
        </div>
      </div>
    </div>
  );
}

export default AIRiskPanel;
