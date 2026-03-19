import React, { useState } from 'react';

const PLATFORM_LABELS = {
  zomato: 'Zomato', swiggy: 'Swiggy', blinkit: 'Blinkit', zepto: 'Zepto',
  amazon: 'Amazon Flex', dunzo: 'Dunzo', swiggy_instamart: 'Swiggy Instamart', rapido: 'Rapido', other: 'Other'
};

function ProfileSection({ user, onLogout }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, weeklyHours: user.weeklyHours });
  const [saved, setSaved] = useState(false);

  const policyNumber = `GS-${user.userId}-${user.city?.slice(0,3).toUpperCase() || 'MUM'}`;
  const joinDate = 'March 2026';

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const platformName = PLATFORM_LABELS[user.platform?.toLowerCase()] || user.platform;

  return (
    <div className="animate-fadeIn">
      {saved && (
        <div className="alert alert-success" style={{ marginBottom: 14 }}>
          <span>✅</span><div><strong>Profile updated successfully!</strong></div>
        </div>
      )}

      {/* Profile Card */}
      <div style={{ background: 'linear-gradient(135deg,#1e3a8a,#2563eb,#7c3aed)', borderRadius: 20, padding: 24, color: 'white', marginBottom: 18, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 900 }}>
            {user.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 2 }}>{user.name}</div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>📱 {user.phone}</div>
            {user.email && <div style={{ fontSize: 13, opacity: 0.85 }}>✉️ {user.email}</div>}
          </div>
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 16 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 10, opacity: 0.75, marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>Platform</div>
            <div style={{ fontWeight: 800, fontSize: 15 }}>{platformName}</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 10, opacity: 0.75, marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>City</div>
            <div style={{ fontWeight: 800, fontSize: 15 }}>{user.city}</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 10, opacity: 0.75, marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>Hours/Wk</div>
            <div style={{ fontWeight: 800, fontSize: 15 }}>{user.weeklyHours}h</div>
          </div>
        </div>
      </div>

      {/* Policy Info */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div className="card-header"><h2>📋 Policy Details</h2></div>
        <div className="info-grid">
          <div className="info-item">
            <div className="label">Policy Number</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#2563eb' }}>{policyNumber}</div>
          </div>
          <div className="info-item">
            <div className="label">Member Since</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{joinDate}</div>
          </div>
          <div className="info-item">
            <div className="label">Coverage</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>₹2,000/week</div>
          </div>
          <div className="info-item">
            <div className="label">Weekly Premium</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f59e0b' }}>₹100</div>
          </div>
        </div>
        <div className="alert alert-info" style={{ marginTop: 10 }}>
          <span>🛡️</span>
          <div style={{ fontSize: 12 }}>
            <strong>Income Loss Only.</strong> Your policy covers wages lost due to weather, platform outages, and civic disruptions — not vehicle or health issues.
          </div>
        </div>
      </div>

      {/* Edit Profile */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div className="card-header">
          <h2>✏️ Edit Profile</h2>
          <button className="btn btn-secondary" onClick={() => setEditing(!editing)} style={{ padding: '6px 14px', fontSize: 13 }}>
            {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {editing ? (
          <div>
            <div className="form-group">
              <label>Full Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Weekly Hours</label>
              <input type="number" value={form.weeklyHours} min={20} max={80} onChange={e => setForm({ ...form, weeklyHours: e.target.value })} />
            </div>
            <button className="btn btn-primary" onClick={handleSave} style={{ width: '100%' }}>
              Save Changes
            </button>
          </div>
        ) : (
          <div style={{ color: '#64748b', fontSize: 14 }}>
            <div>Name: <strong style={{ color: '#1e293b' }}>{user.name}</strong></div>
            <div style={{ marginTop: 4 }}>Weekly Hours: <strong style={{ color: '#1e293b' }}>{user.weeklyHours}h</strong></div>
          </div>
        )}
      </div>

      {/* Logout */}
      <button className="btn btn-secondary" onClick={onLogout}
        style={{ width: '100%', padding: 13, fontSize: 14, border: '1.5px solid #fee2e2', color: '#ef4444', background: '#fff5f5' }}>
        👤 Log Out
      </button>
    </div>
  );
}

export default ProfileSection;
