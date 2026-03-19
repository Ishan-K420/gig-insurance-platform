import React, { useState } from 'react';

const PLATFORMS = [
  { value: 'amazon',     label: '📦 Amazon Flex',      segment: 'E-Commerce' },
  { value: 'flipkart',   label: '🛍️ Flipkart (Ekart)', segment: 'E-Commerce' },
  { value: 'shadowfax',  label: '🏎️ Shadowfax',        segment: 'E-Commerce' },
  { value: 'delhivery',  label: '🚚 Delhivery',        segment: 'E-Commerce' },
  { value: 'meesho',     label: '📫 Meesho',           segment: 'E-Commerce' },
  { value: 'ecom',       label: '📮 Ecom Express',     segment: 'E-Commerce' }
];

const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat'];

const FEATURES = [
  { icon: '⚡', label: 'Auto-Payout in minutes' },
  { icon: '🤖', label: 'AI Fraud Detection' },
  { icon: '📦', label: 'E-Commerce delivery focused' },
  { icon: '💰', label: 'From ₹100/week only' }
];

function Registration({ onRegister }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', platform: 'amazon', city: 'Mumbai', weeklyHours: 50
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!/^[0-9]{10}$/.test(formData.phone)) e.phone = 'Enter a valid 10-digit number';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleStep1 = e => {
    e.preventDefault();
    if (validate()) setStep(2);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onRegister({ ...formData, userId: Math.floor(Math.random() * 90000) + 10000, premium: 100, coverage: 2000 });
  };

  return (
    <div className="reg-page">
      {/* Hero */}
      <div className="reg-hero">
        <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
        <h1>Gig Shield</h1>
        <p>AI-powered income protection for e-commerce delivery partners</p>
        <div className="reg-badges">
          {FEATURES.map(f => (
            <span key={f.label} className="reg-badge">{f.icon} {f.label}</span>
          ))}
        </div>
      </div>

      {/* Step Indicator */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, alignItems: 'center' }}>
        {[1, 2].map(s => (
          <React.Fragment key={s}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 800,
              background: step >= s ? '#2563eb' : 'rgba(255,255,255,0.2)',
              color: step >= s ? 'white' : 'rgba(255,255,255,0.5)'
            }}>{s}</div>
            {s < 2 && <div style={{ flex: 1, height: 2, background: step > s ? '#2563eb' : 'rgba(255,255,255,0.2)', borderRadius: 1 }} />}
          </React.Fragment>
        ))}
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginLeft: 8 }}>
          Step {step} of 2
        </div>
      </div>

      <div className="reg-form-card">
        {step === 1 && (
          <>
            <h2>👤 Your Details</h2>
            <form onSubmit={handleStep1}>
              <div className="form-group">
                <label>Full Name</label>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="E.g. Ravi Kumar" required />
                {errors.name && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.name}</div>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="10-digit number" />
                  {errors.phone && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.phone}</div>}
                </div>
                <div className="form-group">
                  <label>Email (optional)</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
                  {errors.email && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.email}</div>}
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 14, fontSize: 15 }}>
                Continue →
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2>🏍️ Work Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Delivery Platform</label>
                <select name="platform" value={formData.platform} onChange={handleChange}>
                  {PLATFORMS.map(p => (
                    <option key={p.value} value={p.value}>{p.label} · {p.segment}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <select name="city" value={formData.city} onChange={handleChange}>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Hours/Week</label>
                  <input name="weeklyHours" type="number" value={formData.weeklyHours} onChange={handleChange} min={20} max={80} required />
                </div>
              </div>

              {/* Preview */}
              <div style={{ background: '#f0f4ff', borderRadius: 12, padding: 14, marginBottom: 16, border: '1.5px solid #dde5ff' }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: '#2563eb' }}>📊 Your Plan Preview</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13, color: '#475569' }}>
                  <div>🛡️ Coverage: <strong>₹2,000/wk</strong></div>
                  <div>💰 Premium: <strong>₹100/wk</strong></div>
                  <div>📦 Persona: <strong>E-Commerce Delivery</strong></div>
                  <div>🤖 AI Risk: <strong>Calculating...</strong></div>
                </div>
                <div style={{ marginTop: 8, fontSize: 11, color: '#7c3aed', fontWeight: 600 }}>
                  ✅ Income loss ONLY — no health/vehicle/accident coverage
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="btn btn-secondary" onClick={() => setStep(1)} style={{ flex: 1 }}>
                  ← Back
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: 14 }}>
                  Get Protected Now 🛡️
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Registration;
