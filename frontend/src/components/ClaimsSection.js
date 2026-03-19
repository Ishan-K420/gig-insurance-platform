import React, { useState } from 'react';

const INCIDENT_TYPES = [
  'Heavy Rain / Flood — Packages undeliverable',
  'Extreme Heat (>42°C) — Health unsafe for delivery',
  'Severe Air Pollution (AQI>300)',
  'Local Strike / Bandh — Roads blocked',
  'Curfew / Delivery Zone Closure',
  'Platform App Outage (Amazon/Flipkart/Shadowfax)',
  'Warehouse Fire / Zone Shutdown',
  'Cyclone / Storm Alert',
  'Other External Disruption'
];

const MOCK_CLAIMS = [
  {
    id: 'CLM-2026-03-19-567',
    type: 'Heavy Rain — Packages Undeliverable',
    date: '19 Mar 2026',
    hours: 3,
    amount: 600,
    status: 'approved',
    fraudScore: 12,
    triggeredBy: 'Parametric – Rainfall >50mm detected in delivery zone',
    paidVia: 'UPI – xxxxxx1234',
    paidOn: '19 Mar 2026, 11:45 PM'
  },
  {
    id: 'CLM-2026-03-11-341',
    type: 'Amazon Flex App Outage',
    date: '11 Mar 2026',
    hours: 2,
    amount: 400,
    status: 'approved',
    fraudScore: 8,
    triggeredBy: 'Parametric – Platform downtime >60 min confirmed',
    paidVia: 'UPI – xxxxxx1234',
    paidOn: '11 Mar 2026, 11:52 PM'
  },
  {
    id: 'CLM-2026-02-28-129',
    type: 'Local Strike — Delivery Zone Blocked',
    date: '28 Feb 2026',
    hours: 5,
    amount: 1000,
    status: 'pending',
    fraudScore: 34,
    triggeredBy: 'Manual – Awaiting route closure verification',
    paidVia: null,
    paidOn: null
  }
];

const STATUS_CONFIG = {
  approved: { label: 'Approved', badge: 'badge-success', icon: '✓' },
  pending:  { label: 'Pending',  badge: 'badge-warning', icon: '⏳' },
  rejected: { label: 'Rejected', badge: 'badge-danger',  icon: '✕' }
};

function FraudIndicator({ score }) {
  const level = score < 20 ? 'low' : score < 50 ? 'medium' : 'high';
  const colors = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' };
  const labels = { low: 'Low Risk', medium: 'Med Risk', high: 'High Risk' };
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginBottom: 4 }}>
        <span>AI Fraud Score</span>
        <span style={{ color: colors[level], fontWeight: 700 }}>{score}/100 – {labels[level]}</span>
      </div>
      <div className="fraud-bar">
        <div className={`fraud-fill-${level}`} style={{ height: '100%', width: `${score}%`, borderRadius: 3 }} />
      </div>
    </div>
  );
}

function ClaimCard({ claim }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[claim.status];
  return (
    <div className="claim-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{claim.type}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>{claim.id} · {claim.date}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#1e293b' }}>₹{claim.amount}</div>
          <span className={`status-badge ${cfg.badge}`} style={{ fontSize: 11 }}>
            {cfg.icon} {cfg.label}
          </span>
        </div>
      </div>
      <div style={{ fontSize: 13, color: '#475569', marginTop: 8, background: '#f8fafc', borderRadius: 8, padding: '8px 12px' }}>
        <strong>Trigger:</strong> {claim.triggeredBy}
      </div>
      <FraudIndicator score={claim.fraudScore} />
      {expanded && (
        <div style={{ marginTop: 12, fontSize: 13, color: '#475569', lineHeight: 1.7 }}>
          <div>⏱ Hours lost: <strong>{claim.hours}h</strong></div>
          <div>💰 Payout: <strong>₹{claim.amount}</strong> ({claim.hours} × ₹{claim.amount/claim.hours}/h income rate)</div>
          {claim.paidVia && <div>📲 Paid via: <strong>{claim.paidVia}</strong></div>}
          {claim.paidOn && <div>✅ Paid on: <strong>{claim.paidOn}</strong></div>}
        </div>
      )}
      <button
        className="btn btn-secondary"
        onClick={() => setExpanded(!expanded)}
        style={{ width: '100%', marginTop: 10, fontSize: 12, padding: '8px' }}
      >
        {expanded ? '▲ Less' : '▼ Details'}
      </button>
    </div>
  );
}

function ClaimsSection({ user }) {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1); // 1=form 2=processing 3=done
  const [form, setForm] = useState({
    type: INCIDENT_TYPES[0],
    date: new Date().toISOString().split('T')[0],
    hours: 2,
    description: '',
    locationProof: true
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setStep(2);
    setTimeout(() => setStep(3), 2500);
  };

  const totalPaid = MOCK_CLAIMS.filter(c => c.status === 'approved').reduce((s, c) => s + c.amount, 0);
  const pendingCount = MOCK_CLAIMS.filter(c => c.status === 'pending').length;

  return (
    <div className="animate-fadeIn">
      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18 }}>
        <div className="analytics-stat">
          <div className="stat-num" style={{ color: '#10b981' }}>₹{totalPaid}</div>
          <div className="stat-lbl">Total Paid Out</div>
        </div>
        <div className="analytics-stat">
          <div className="stat-num" style={{ color: '#2563eb' }}>{MOCK_CLAIMS.length}</div>
          <div className="stat-lbl">Total Claims</div>
        </div>
        <div className="analytics-stat">
          <div className="stat-num" style={{ color: '#f59e0b' }}>{pendingCount}</div>
          <div className="stat-lbl">Pending</div>
        </div>
      </div>

      {/* File Claim Button */}
      <button className="btn btn-primary" onClick={() => { setShowModal(true); setStep(1); }}
        style={{ width: '100%', marginBottom: 18, padding: 14, fontSize: 15 }}>
        ⚡ File New Income Loss Claim
      </button>

      {/* Info box */}
      <div className="alert alert-info" style={{ marginBottom: 18 }}>
        <span style={{ fontSize: 20 }}>🤖</span>
        <div>
          <strong>Parametric Auto-Claims:</strong> Weather & platform disruptions are detected automatically. 
          Your claim may be auto-approved before you even report it!
        </div>
      </div>

      {/* Claims List */}
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#1e293b' }}>📋 Claim History</div>
      {MOCK_CLAIMS.map(c => <ClaimCard key={c.id} claim={c} />)}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ fontSize: 18, fontWeight: 800 }}>⚡ File Income Loss Claim</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>

            {step === 1 && (
              <form onSubmit={handleSubmit}>
                <div className="alert alert-warning" style={{ marginBottom: 18 }}>
                  <span>⚠️</span>
                  <div style={{ fontSize: 13 }}>
                    <strong>Income Loss Only.</strong> We cover wages lost due to external disruptions — not vehicle repairs, health, or accidents.
                  </div>
                </div>
                <div className="form-group">
                  <label>Disruption Type</label>
                  <select name="type" value={form.type} onChange={handleChange}>
                    {INCIDENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div className="form-group">
                    <label>Date of Incident</label>
                    <input type="date" name="date" value={form.date} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Hours Lost</label>
                    <input type="number" name="hours" value={form.hours} onChange={handleChange} min={1} max={12} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Brief Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange}
                    placeholder="Describe what happened and why you couldn't work..." required />
                </div>
                <div style={{ background: '#f0fdf4', border: '1px solid #10b981', borderRadius: 10, padding: 12, marginBottom: 18, fontSize: 13, color: '#166534' }}>
                  <strong>📍 Location + Delivery Route auto-verified.</strong> GPS route data and platform API logs will be cross-referenced with disruption data for instant approval.
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 14 }}>
                  Submit Claim →
                </button>
              </form>
            )}

            {step === 2 && (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <div className="spinner" style={{ width: 56, height: 56, borderWidth: 4 }} />
                <div style={{ fontWeight: 700, fontSize: 17, marginTop: 16 }}>AI Fraud Analysis Running...</div>
                <div style={{ color: '#64748b', fontSize: 13, marginTop: 8 }}>Cross-checking location, weather & platform data</div>
                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left', background: '#f8fafc', borderRadius: 12, padding: 16 }}>
                  {['✅ GPS location verified', '✅ Rainfall data matched (67mm)', '✅ Platform downtime confirmed', '🔄 Duplicate check...'].map((t, i) => (
                    <div key={i} style={{ fontSize: 13, color: '#475569' }}>{t}</div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                <div style={{ fontWeight: 800, fontSize: 20, color: '#10b981', marginBottom: 8 }}>
                  Claim Approved!
                </div>
                <div style={{ color: '#475569', fontSize: 14, marginBottom: 20 }}>
                  ₹{form.hours * 200} will be credited to your UPI in the next few minutes.
                </div>
                <div style={{ background: '#f0fdf4', border: '1px solid #10b981', borderRadius: 12, padding: 16, marginBottom: 20, fontSize: 13, color: '#166534', textAlign: 'left' }}>
                  <div>💰 Payout: <strong>₹{form.hours * 200}</strong> ({form.hours} shifts × ₹200/shift avg income loss)</div>
                  <div>📲 Via: <strong>UPI – xxxxxx1234</strong></div>
                  <div>🤖 AI Fraud Score: <strong>18/100 (Low Risk)</strong></div>
                  <div>🔗 Recorded on Polygon blockchain</div>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(false)} style={{ width: '100%' }}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClaimsSection;
