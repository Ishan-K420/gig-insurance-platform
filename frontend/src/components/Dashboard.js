import React from 'react';
import CollapsibleSection from './CollapsibleSection';
import AIRiskPanel from './AIRiskPanel';
import EarningsTracker from './EarningsTracker';
import PolicyRenewalTimer from './PolicyRenewalTimer';
import SafetyScoreCard from './SafetyScoreCard';
import StreakRewards from './StreakRewards';
import MicroSavings from './MicroSavings';
import BlockchainVerification from './BlockchainVerification';

function Dashboard({ user }) {
  const coverage = user?.coverage || 2000;
  const premium = user?.premium || 100;
  const remainingCoverage = 1400;
  const coveragePercent = Math.round((remainingCoverage / coverage) * 100);

  // Compute live expiry
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
  const expiry = new Date(now);
  expiry.setDate(now.getDate() + daysUntilMonday);
  expiry.setHours(0, 0, 0, 0);
  const expiryStr = expiry.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div>
      {/* Hero Coverage Card */}
      <div className="card" style={{ background: 'linear-gradient(135deg,#1e3a8a 0%,#2563eb 60%,#7c3aed 100%)', color: 'white', border: 'none', marginBottom: 16 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, opacity: 0.8, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
            Weekly Income Coverage
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, margin: '8px 0' }}>₹{coverage}</div>
          <div style={{ fontSize: 15, opacity: 0.9, marginBottom: 14 }}>
            ₹{remainingCoverage} remaining ({coveragePercent}%)
          </div>
          <div className="progress-bar" style={{ background: 'rgba(255,255,255,0.2)', height: 10 }}>
            <div className="progress-fill" style={{ width: `${coveragePercent}%`, background: 'rgba(255,255,255,0.95)' }} />
          </div>
          <div style={{ fontSize: 12, opacity: 0.75, marginTop: 10 }}>
            ⏳ Policy valid until: <strong>{expiryStr}</strong>
          </div>
        </div>
      </div>

      {/* Policy Quick Stats */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">
          <h2>📋 Policy Overview</h2>
          <span className="status-badge badge-success">● Active</span>
        </div>
        <div className="info-grid">
          <div className="info-item">
            <div className="label">Weekly Premium</div>
            <div className="value">₹{premium}</div>
          </div>
          <div className="info-item">
            <div className="label">Platform</div>
            <div className="value" style={{ fontSize: 16 }}>{user?.platform || '-'}</div>
          </div>
          <div className="info-item">
            <div className="label">City</div>
            <div className="value" style={{ fontSize: 16 }}>{user?.city || '-'}</div>
          </div>
          <div className="info-item">
            <div className="label">Hours / Week</div>
            <div className="value">{user?.weeklyHours || '-'}h</div>
          </div>
        </div>
        <div className="alert alert-info" style={{ marginTop: 8, marginBottom: 0 }}>
          <span>🛡️</span>
          <div style={{ fontSize: 12 }}>
            <strong>Income Loss Protection Only</strong> — Covers wages lost to weather, platform outages, curfews. Excludes health, accidents & vehicle repair.
          </div>
        </div>
      </div>

      {/* AI Risk */}
      <AIRiskPanel user={user} />

      {/* Earnings Tracker */}
      <EarningsTracker user={user} />

      {/* Policy Renewal Timer */}
      <PolicyRenewalTimer user={user} />

      {/* Safety Score */}
      <SafetyScoreCard user={user} />

      {/* Collapsible sections */}
      <CollapsibleSection icon="🎮" title="Streak Rewards" description="8 weeks claim-free · ⚡ Lightning Bolt earned" defaultOpen={false}>
        <StreakRewards user={user} />
      </CollapsibleSection>

      <CollapsibleSection icon="💰" title="Micro-Savings Wallet" description="₹1,120 saved · 4% interest earned" defaultOpen={false}>
        <MicroSavings user={user} />
      </CollapsibleSection>

      <CollapsibleSection icon="🔗" title="Blockchain Verification" description="Claims secured on Polygon network" defaultOpen={false}>
        <BlockchainVerification user={user} />
      </CollapsibleSection>
    </div>
  );
}

export default Dashboard;
