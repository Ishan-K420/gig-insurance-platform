import React, { useState, useEffect } from 'react';

function PolicyRenewalTimer({ user }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [renewed, setRenewed] = useState(false);
  const [renewing, setRenewing] = useState(false);

  // Policy expires at end of week (next Monday 00:00)
  const getExpiry = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon...
    const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    const expiry = new Date(now);
    expiry.setDate(now.getDate() + daysUntilMonday);
    expiry.setHours(0, 0, 0, 0);
    return expiry;
  };

  useEffect(() => {
    const tick = () => {
      const expiry = getExpiry();
      const diff = expiry - new Date();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 }); return; }
      setTimeLeft({
        days:  Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins:  Math.floor((diff % 3600000)  / 60000),
        secs:  Math.floor((diff % 60000)    / 1000)
      });
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const handleRenew = () => {
    setRenewing(true);
    setTimeout(() => { setRenewing(false); setRenewed(true); }, 2000);
  };

  if (!timeLeft) return <div className="spinner" />;

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 24;
  const expiryDate = getExpiry().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="card animate-fadeIn" style={{ borderColor: isUrgent ? '#ef4444' : undefined }}>
      <div className="card-header">
        <h2>⏳ Policy Renewal Timer</h2>
        <span className={`status-badge ${renewed ? 'badge-success' : isUrgent ? 'badge-danger' : 'badge-info'}`}>
          {renewed ? '✓ Renewed' : isUrgent ? '⚠️ Urgent' : 'Active'}
        </span>
      </div>

      {!renewed ? (
        <>
          <div style={{ textAlign: 'center', marginBottom: 16, fontSize: 13, color: '#64748b' }}>
            Current policy expires on <strong style={{ color: '#1e293b' }}>{expiryDate}</strong>
          </div>

          <div className="timer-grid">
            {[
              { val: timeLeft.days,  lbl: 'Days' },
              { val: timeLeft.hours, lbl: 'Hours' },
              { val: timeLeft.mins,  lbl: 'Mins' },
              { val: timeLeft.secs,  lbl: 'Secs' }
            ].map(u => (
              <div key={u.lbl} className={`timer-unit ${isUrgent ? 'urgent' : ''}`}>
                <div className="timer-value">
                  {String(u.val).padStart(2, '0')}
                </div>
                <div className="timer-label">{u.lbl}</div>
              </div>
            ))}
          </div>

          {isUrgent && (
            <div className="alert alert-danger" style={{ margin: '14px 0' }}>
              <span style={{ fontSize: 20 }}>🚨</span>
              <div>
                <strong>Less than 24 hours left!</strong><br />
                <span style={{ fontSize: 12 }}>Renew now to stay protected. Coverage gaps leave you exposed during disruptions.</span>
              </div>
            </div>
          )}

          {/* Weekly premium breakdown */}
          <div style={{ background: '#f8fafc', borderRadius: 12, padding: 14, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>💰 Next Week Premium (AI Calculated)</div>
            {[
              { label: 'Base premium', value: '₹80', color: '#64748b' },
              { label: 'Location risk (+)', value: '₹15', color: '#f59e0b' },
              { label: 'Streak discount (–)', value: '–₹10', color: '#10b981' },
              { label: 'Hours adjustment (+)', value: '₹15', color: '#7c3aed' }
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: '#64748b' }}>{r.label}</span>
                <strong style={{ color: r.color }}>{r.value}</strong>
              </div>
            ))}
            <div style={{ borderTop: '1.5px solid #e2e8f0', paddingTop: 8, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
              <strong>Total Weekly Premium</strong>
              <strong style={{ fontSize: 18, color: '#2563eb' }}>₹100</strong>
            </div>
          </div>

          <button
            className={`btn ${isUrgent ? 'btn-danger' : 'btn-primary'}`}
            onClick={handleRenew}
            disabled={renewing}
            style={{ width: '100%', padding: 14, fontSize: 15 }}
          >
            {renewing ? '⏳ Processing...' : `${isUrgent ? '🚨' : '🔄'} Renew for ₹100 next week`}
          </button>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
          <div style={{ fontWeight: 800, fontSize: 20, color: '#10b981', marginBottom: 8 }}>Policy Renewed!</div>
          <div style={{ fontSize: 14, color: '#64748b' }}>
            You're protected for another week. ₹100 will be deducted from your earnings.
          </div>
          <div style={{ marginTop: 16, background: '#f0fdf4', borderRadius: 12, padding: 14, fontSize: 13, color: '#166534', textAlign: 'left' }}>
            <div>✅ Coverage: ₹2,000 income protection</div>
            <div>📅 Valid: Next 7 days</div>
            <div>⚡ Auto-claim enabled for parametric events</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PolicyRenewalTimer;
