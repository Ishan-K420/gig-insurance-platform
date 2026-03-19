import React, { useState } from 'react';

// E-Commerce delivery: per-parcel model
const PLATFORM_RATES = {
  amazon:    { perParcel: 22, shiftBonus: 120, avgParcels: 25, name: 'Amazon Flex' },
  flipkart:  { perParcel: 18, shiftBonus: 90,  avgParcels: 30, name: 'Flipkart Ekart' },
  shadowfax: { perParcel: 16, shiftBonus: 80,  avgParcels: 28, name: 'Shadowfax' },
  delhivery: { perParcel: 15, shiftBonus: 75,  avgParcels: 32, name: 'Delhivery' },
  meesho:    { perParcel: 14, shiftBonus: 70,  avgParcels: 35, name: 'Meesho' },
  ecom:      { perParcel: 15, shiftBonus: 72,  avgParcels: 30, name: 'Ecom Express' }
};

function EarningsTracker({ user }) {
  const [parcelsToday, setParcelsToday] = useState(25);
  const [shiftsPerWeek, setShiftsPerWeek] = useState(6);

  const platform = user?.platform?.toLowerCase() || 'amazon';
  const rates = PLATFORM_RATES[platform] || PLATFORM_RATES.amazon;

  const dailyEarnings = parcelsToday * rates.perParcel + rates.shiftBonus;
  const weeklyEarnings = dailyEarnings * shiftsPerWeek;
  const weeklyPremium = user?.premium || 100;
  const coveredIncome = Math.min(weeklyEarnings * 0.8, 5000);
  const uncoveredIncome = weeklyEarnings - coveredIncome;
  const coveragePercent = Math.round((coveredIncome / weeklyEarnings) * 100);

  // SVG ring chart
  const R = 56, C = 2 * Math.PI * R;
  const filledArc = (C * coveragePercent) / 100;

  return (
    <div className="card animate-fadeIn">
      <div className="card-header">
        <h2>💹 Live Earnings Tracker</h2>
        <span className="status-badge badge-success">Live</span>
      </div>

      {/* SVG Ring chart */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
        <div className="score-ring" style={{ width: 130, height: 130 }}>
          <svg width="130" height="130">
            <circle cx="65" cy="65" r={R} fill="none" stroke="#e2e8f0" strokeWidth="12"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '65px 65px' }} />
            <circle cx="65" cy="65" r={R} fill="none" stroke="url(#earningsGrad)" strokeWidth="12"
              strokeDasharray={`${filledArc} ${C}`}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '65px 65px', transition: 'stroke-dasharray 0.8s ease' }} />
            <defs>
              <linearGradient id="earningsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
          <div className="score-center">
            <div style={{ fontSize: 26, fontWeight: 900, color: '#10b981' }}>{coveragePercent}%</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Covered</div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>WEEKLY EARNINGS</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#1e293b' }}>₹{weeklyEarnings.toLocaleString()}</div>
          </div>
          <div style={{ fontSize: 13, color: '#10b981', fontWeight: 700 }}>✅ ₹{coveredIncome.toFixed(0)} covered</div>
          <div style={{ fontSize: 13, color: '#ef4444', fontWeight: 600 }}>⚠️ ₹{uncoveredIncome.toFixed(0)} at-risk</div>
        </div>
      </div>

      {/* Sliders */}
      <div style={{ background: '#f8fafc', borderRadius: 14, padding: 16, marginBottom: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, color: '#1e293b' }}>📊 Adjust Your Delivery Day</div>

        {[
          { label: `Parcels Delivered Today`, value: parcelsToday, min: 5, max: 60, set: setParcelsToday, unit: ' pkgs' },
          { label: `Shifts per Week`, value: shiftsPerWeek, min: 1, max: 7, set: setShiftsPerWeek, unit: 'd' }
        ].map(s => (
          <div key={s.label} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginBottom: 4 }}>
              <span>{s.label}</span>
              <strong style={{ color: '#1e293b' }}>{s.value}{s.unit}</strong>
            </div>
            <input type="range" min={s.min} max={s.max} value={s.value}
              onChange={e => s.set(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#2563eb' }} />
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="info-grid">
        <div className="info-item">
          <div className="label">Per Parcel</div>
          <div className="value" style={{ fontSize: 18, color: '#2563eb' }}>₹{rates.perParcel}</div>
        </div>
        <div className="info-item">
          <div className="label">Shift Bonus</div>
          <div className="value" style={{ fontSize: 18, color: '#7c3aed' }}>₹{rates.shiftBonus}</div>
        </div>
        <div className="info-item">
          <div className="label">Today Earned</div>
          <div className="value" style={{ fontSize: 18, color: '#10b981' }}>₹{dailyEarnings.toFixed(0)}</div>
        </div>
        <div className="info-item">
          <div className="label">Weekly Premium</div>
          <div className="value" style={{ fontSize: 18, color: '#f59e0b' }}>₹{weeklyPremium}</div>
        </div>
      </div>

      <div className="alert alert-info" style={{ marginTop: 10 }}>
        <span>💡</span>
        <div style={{ fontSize: 12 }}>
          <strong>Platform: {rates.name}</strong> — If just <strong>1 shift day</strong> is lost to a disruption (₹{dailyEarnings.toFixed(0)}), your ₹100/week policy pays for itself <strong>{Math.floor(dailyEarnings / weeklyPremium)}×</strong>!
        </div>
      </div>
    </div>
  );
}

export default EarningsTracker;
