import React, { useState } from 'react';

const DISRUPTIONS = [
  {
    id: 1,
    name: 'Heavy Rainfall',
    icon: '🌧️',
    status: 'active',
    value: '68 mm',
    threshold: '>50 mm',
    trigger: 'TRIGGERED',
    impact: 'Package deliveries halted in Andheri, Dadar, Kurla — roads flooded',
    affectedRiders: 1247,
    autoPayout: true
  },
  {
    id: 2,
    name: 'Air Quality Index',
    icon: '😷',
    status: 'warning',
    value: 'AQI 218',
    threshold: '>200',
    trigger: 'WATCH',
    impact: 'Poor air quality — extended outdoor delivery exposure risky',
    affectedRiders: 845,
    autoPayout: false
  },
  {
    id: 3,
    name: 'Extreme Heat',
    icon: '🌡️',
    status: 'normal',
    value: '36°C',
    threshold: '>42°C',
    trigger: 'NORMAL',
    impact: 'Within acceptable range for delivery operations',
    affectedRiders: 0,
    autoPayout: false
  },
  {
    id: 4,
    name: 'Platform/App Status',
    icon: '📦',
    status: 'normal',
    value: '99.8% uptime',
    threshold: '<95% uptime',
    trigger: 'NORMAL',
    impact: 'Amazon Flex, Flipkart & Shadowfax all operating normally',
    affectedRiders: 0,
    autoPayout: false
  },
  {
    id: 5,
    name: 'Road/Zone Disruption',
    icon: '🚧',
    status: 'warning',
    value: '3 zones',
    threshold: '>2 zones',
    trigger: 'WATCH',
    impact: 'Road closures affecting last-mile delivery: NH-48, Link Road',
    affectedRiders: 312,
    autoPayout: false
  }
];

const TRIGGER_HISTORY = [
  { date: '19 Mar 2026, 6:30 PM', event: 'Heavy Rain >50mm — Packages undeliverable', riders: 1247, payout: '₹2,49,400', auto: true },
  { date: '11 Mar 2026, 2:00 PM', event: 'Amazon Flex App Outage >60 min', riders: 643, payout: '₹1,28,600', auto: true },
  { date: '28 Feb 2026, 10:00 AM', event: 'Local Strike — Delivery Zone Closed', riders: 284, payout: '₹56,800', auto: false }
];

function ParametricTrigger({ user }) {
  const [selected, setSelected] = useState(null);
  const active = DISRUPTIONS.filter(d => d.status === 'active');

  const statusClass = s => s === 'active' ? 'trigger-active' : s === 'warning' ? 'trigger-warning' : 'trigger-normal';
  const statusColor = s => s === 'active' ? '#ef4444' : s === 'warning' ? '#f59e0b' : '#10b981';

  return (
    <div className="animate-fadeIn">
      {active.length > 0 && (
        <div className="card" style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)', color: 'white', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 28 }}>🚨</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17 }}>ACTIVE DISRUPTION — E-COMMERCE DELIVERY PAYOUT TRIGGERED</div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>{active[0].impact}</div>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '12px 16px', fontSize: 14 }}>
            <div>📍 Affected riders in {user?.city || 'Mumbai'}: <strong>{active[0].affectedRiders.toLocaleString()}</strong></div>
            <div>💸 Auto-payout: <strong>₹200/hour</strong> per affected rider</div>
            <div style={{ marginTop: 8, fontSize: 12, opacity: 0.85 }}>
              Payout initiated automatically based on parametric weather data. No claim filing needed!
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{ marginBottom: 18 }}>
        <div className="card-header">
          <h2>⚡ Live Disruption Monitor</h2>
          <span className="status-badge badge-info">Live</span>
        </div>
        {DISRUPTIONS.map(d => (
          <div key={d.id} className={`trigger-item ${statusClass(d.status)}`} onClick={() => setSelected(selected?.id === d.id ? null : d)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 24 }}>{d.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Threshold: {d.threshold}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{d.value}</div>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10,
                  background: `${statusColor(d.status)}18`, color: statusColor(d.status)
                }}>{d.trigger}</span>
              </div>
            </div>
            {selected?.id === d.id && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: 13, color: '#475569' }}>
                <div>⚠️ {d.impact}</div>
                {d.affectedRiders > 0 && <div>👥 Affected riders: <strong>{d.affectedRiders.toLocaleString()}</strong></div>}
                <div>💰 Payout: {d.autoPayout ? <strong style={{ color: '#ef4444' }}>AUTO – ₹200/hour</strong> : 'Manual claim required'}  </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header"><h2>📜 Trigger History</h2></div>
        {TRIGGER_HISTORY.map((t, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0', borderBottom: i < TRIGGER_HISTORY.length - 1 ? '1px solid #f0f4ff' : 'none' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{t.event}</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>{t.date} · {t.riders.toLocaleString()} riders</div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10,
                background: t.auto ? '#dcfce7' : '#fef3c7', color: t.auto ? '#166534' : '#92400e', marginTop: 4, display: 'inline-block' }}>
                {t.auto ? '⚡ AUTO' : '📝 MANUAL'}
              </span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#10b981' }}>{t.payout}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParametricTrigger;
