import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const WEEKLY_PAYOUTS = [
  { week: 'W1', payouts: 34200, claims: 18 },
  { week: 'W2', payouts: 12400, claims: 7 },
  { week: 'W3', payouts: 89600, claims: 47 },
  { week: 'W4', payouts: 56800, claims: 31 },
  { week: 'W5', payouts: 21000, claims: 12 },
  { week: 'W6', payouts: 249400, claims: 138 },
  { week: 'W7', payouts: 67200, claims: 36 },
  { week: 'W8', payouts: 43800, claims: 24 }
];

const DISRUPTION_PIE = [
  { name: 'Heavy Rain', value: 45, color: '#3b82f6' },
  { name: 'Extreme Heat', value: 20, color: '#f59e0b' },
  { name: 'App Outage', value: 18, color: '#8b5cf6' },
  { name: 'Strike/Curfew', value: 10, color: '#ef4444' },
  { name: 'Pollution', value: 7,  color: '#64748b' }
];

const CITY_DATA = [
  { city: 'Mumbai',    riders: 8420, payouts: 198400, claimRate: '4.2%' },
  { city: 'Delhi',     riders: 6130, payouts: 134600, claimRate: '3.8%' },
  { city: 'Bengaluru', riders: 5840, payouts: 89200,  claimRate: '2.9%' },
  { city: 'Chennai',   riders: 3210, payouts: 54600,  claimRate: '3.1%' },
  { city: 'Hyderabad', riders: 2870, payouts: 41200,  claimRate: '2.7%' }
];

const PREMIUM_TREND = [
  { week: 'W1', avg: 98 }, { week: 'W2', avg: 102 }, { week: 'W3', avg: 115 },
  { week: 'W4', avg: 109 }, { week: 'W5', avg: 97 }, { week: 'W6', avg: 124 },
  { week: 'W7', avg: 106 }, { week: 'W8', avg: 110 }
];

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className="analytics-stat">
      <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
      <div className="stat-num" style={{ color }}>{value}</div>
      <div className="stat-lbl">{label}</div>
      {sub && <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

function AnalyticsDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="animate-fadeIn">
      {/* Header Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, background: '#f0f4ff', borderRadius: 12, padding: 4 }}>
        {['overview','disruptions','cities','premium'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            flex: 1, padding: '8px 4px', border: 'none', borderRadius: 8, cursor: 'pointer',
            fontSize: 13, fontWeight: 700, fontFamily: 'inherit', transition: 'all 0.2s',
            background: activeTab === t ? 'white' : 'transparent',
            color: activeTab === t ? '#2563eb' : '#64748b',
            boxShadow: activeTab === t ? '0 1px 6px rgba(37,99,235,0.12)' : 'none'
          }}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 18 }}>
            <StatCard icon="🛡️" label="Active Policies" value="26,847" sub="↑ 12% this week" color="#2563eb" />
            <StatCard icon="💸" label="Total Paid Out" value="₹47.2L" sub="This month" color="#10b981" />
            <StatCard icon="⚡" label="Auto Claims" value="94%" sub="Parametric triggered" color="#7c3aed" />
            <StatCard icon="⏱️" label="Avg Payout Time" value="8 min" sub="End-to-end" color="#f59e0b" />
          </div>

          <div className="card">
            <div className="card-header"><h2>💰 Weekly Payouts</h2></div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={WEEKLY_PAYOUTS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f4ff" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Payouts']} />
                <Bar dataKey="payouts" fill="#2563eb" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <div className="card-header"><h2>🤖 AI Fraud Detection</h2></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { label: 'Claims Screened', v: '1,824', color: '#2563eb' },
                { label: 'Flagged', v: '47', color: '#f59e0b' },
                { label: 'Rejected', v: '12', color: '#ef4444' }
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center', background: '#f8fafc', borderRadius: 12, padding: 14, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, fontSize: 13, color: '#475569' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span>Fraud Detection Accuracy</span><strong style={{ color: '#10b981' }}>98.7%</strong>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '98.7%', background: 'linear-gradient(90deg,#10b981,#059669)' }} />
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'disruptions' && (
        <div className="card">
          <div className="card-header"><h2>⚡ Claims by Disruption Type</h2></div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={DISRUPTION_PIE} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                {DISRUPTION_PIE.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={v => [`${v}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          {DISRUPTION_PIE.map(d => (
            <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid #f0f4ff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: d.color }} />
                <span style={{ fontSize: 14, fontWeight: 600 }}>{d.name}</span>
              </div>
              <span style={{ fontWeight: 700, color: d.color }}>{d.value}%</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'cities' && (
        <div className="card">
          <div className="card-header"><h2>🏙️ City-Wise Stats</h2></div>
          {CITY_DATA.map((c, i) => (
            <div key={c.city} style={{ padding: '14px 0', borderBottom: i < CITY_DATA.length-1 ? '1px solid #f0f4ff' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{c.city}</span>
                  <span style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>{c.riders.toLocaleString()} riders</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: '#10b981', fontSize: 15 }}>₹{(c.payouts/1000).toFixed(0)}k paid</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>Claim rate: {c.claimRate}</div>
                </div>
              </div>
              <div className="progress-bar" style={{ marginTop: 4 }}>
                <div className="progress-fill" style={{ width: `${(c.riders/8420)*100}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'premium' && (
        <div className="card">
          <div className="card-header"><h2>📈 Average Weekly Premium Trend</h2></div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={PREMIUM_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f4ff" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${v}`} />
              <Tooltip formatter={v => [`₹${v}`, 'Avg Premium']} />
              <Line type="monotone" dataKey="avg" stroke="#2563eb" strokeWidth={3} dot={{ fill: '#2563eb', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="alert alert-info" style={{ marginTop: 14 }}>
            <span>🤖</span>
            <div style={{ fontSize: 13 }}>
              <strong>AI Dynamic Pricing:</strong> Premium spikes like W6 correspond to monsoon season. AI adjusts your premium weekly based on real-time risk factors.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalyticsDashboard;
