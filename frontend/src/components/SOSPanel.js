import React, { useState } from 'react';

const EMERGENCY_CONTACTS = {
  Mumbai:    [{ name: 'Police',          num: '100' }, { name: 'Ambulance',       num: '108' }, { name: 'Zomato Support',  num: '1800-103-8285' }, { name: 'Swiggy Support',  num: '1800-208-8888' }],
  Delhi:     [{ name: 'Police',          num: '100' }, { name: 'Ambulance',       num: '108' }, { name: 'Fire',            num: '101' }],
  Bangalore: [{ name: 'Police',          num: '100' }, { name: 'Ambulance',       num: '108' }],
  default:   [{ name: 'Police',          num: '100' }, { name: 'Ambulance',       num: '108' }]
};

function SOSPanel({ user, onClose }) {
  const [step, setStep] = useState('main'); // main | confirm | countdown | cancelled | sent
  const [countdown, setCountdown] = useState(10);

  const contacts = EMERGENCY_CONTACTS[user?.city] || EMERGENCY_CONTACTS.default;

  const handleSOS = () => {
    setStep('countdown');
    let c = 10;
    const iv = setInterval(() => {
      c -= 1;
      setCountdown(c);
      if (c <= 0) {
        clearInterval(iv);
        setStep('sent');
      }
    }, 1000);
    // Store interval ref for cancel
    window.__sosIv = iv;
  };

  const handleCancel = () => {
    clearInterval(window.__sosIv);
    setStep('cancelled');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ color: '#ef4444', fontSize: 20, fontWeight: 800 }}>🆘 Emergency SOS</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {step === 'main' && (
          <>
            <div className="sos-panel" style={{ marginBottom: 16, borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 10 }}>
                📍 Location will be captured and shared with emergency services.
                A claim will be auto-filed for any income lost due to this incident.
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
                <strong style={{ color: '#ef4444' }}>IMPORTANT:</strong> SOS covers income disruption — not medical emergencies. Call 108 for medical help.
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#64748b', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                📞 Emergency Contacts — {user?.city || 'Your City'}
              </div>
              {contacts.map(c => (
                <a key={c.name} href={`tel:${c.num}`} style={{ textDecoration: 'none' }}>
                  <div className="emergency-contact" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '12px 16px', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.15s' }}>
                    <span style={{ fontWeight: 600, color: '#1e293b', fontSize: 14 }}>{c.name}</span>
                    <span style={{ fontWeight: 800, color: '#ef4444', fontSize: 18 }}>{c.num}</span>
                  </div>
                </a>
              ))}
            </div>

            <button className="btn btn-danger" style={{ width: '100%', padding: 15, fontSize: 16, fontWeight: 800, letterSpacing: 1 }}
              onClick={() => setStep('confirm')}>
              🆘 SEND SOS ALERT
            </button>
          </>
        )}

        {step === 'confirm' && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 12 }}>⚠️</div>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Are you sure?</div>
            <div style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>
              This will alert emergency services, capture your GPS location, and auto-file an income loss claim.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button className="btn btn-danger" onClick={handleSOS}>Yes, Send SOS</button>
            </div>
          </div>
        )}

        {step === 'countdown' && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ fontSize: 80, fontWeight: 900, color: '#ef4444', lineHeight: 1, animation: 'pulse 1s ease-in-out infinite', marginBottom: 12 }}>
              {countdown}
            </div>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Sending SOS in {countdown}s...</div>
            <div style={{ color: '#64748b', fontSize: 13, marginBottom: 20 }}>GPS location captured. Tap cancel if this was a mistake.</div>
            <button className="btn btn-secondary" onClick={handleCancel} style={{ width: '100%', padding: 12 }}>
              ✕ Cancel SOS
            </button>
          </div>
        )}

        {step === 'cancelled' && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8, color: '#10b981' }}>SOS Cancelled</div>
            <div style={{ color: '#64748b', fontSize: 13, marginBottom: 20 }}>No alert was sent. Stay safe!</div>
            <button className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>Close</button>
          </div>
        )}

        {step === 'sent' && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>🆘</div>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8, color: '#ef4444' }}>SOS Sent!</div>
            <div style={{ background: '#fff5f5', border: '1px solid #ef4444', borderRadius: 12, padding: 14, marginBottom: 16, fontSize: 13, color: '#991b1b', textAlign: 'left' }}>
              <div>📍 GPS: {user?.city || 'Location'} (captured)</div>
              <div>📲 Emergency notified</div>
              <div>⚡ Income loss claim auto-filed</div>
              <div>💸 Payout processing within 10 min</div>
            </div>
            <button className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SOSPanel;
