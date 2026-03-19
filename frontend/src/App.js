import React, { useState, useEffect } from 'react';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import ClaimsSection from './components/ClaimsSection';
import ParametricTrigger from './components/ParametricTrigger';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ProfileSection from './components/ProfileSection';
import CommunityFeed from './components/CommunityFeed';
import VoiceAssistant from './components/VoiceAssistant';
import WeatherTracker from './components/WeatherTracker';
import LocationTracker from './components/LocationTracker';
import CollapsibleSection from './components/CollapsibleSection';
import SOSPanel from './components/SOSPanel';
import './App.css';

const TABS = [
  { id: 'home',       icon: '🏠', label: 'Home' },
  { id: 'disruptions',icon: '⚡', label: 'Alerts' },
  { id: 'claims',     icon: '📋', label: 'Claims' },
  { id: 'analytics',  icon: '📊', label: 'Analytics' },
  { id: 'profile',    icon: '👤', label: 'Profile' }
];

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showVoice, setShowVoice] = useState(false);
  const [showSOS, setShowSOS] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gigShieldUser');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleRegister = userData => {
    setUser(userData);
    localStorage.setItem('gigShieldUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gigShieldUser');
    setActiveTab('home');
  };

  if (!user) return <Registration onRegister={handleRegister} />;

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>🛡️ Gig Shield</h1>
          <div className="header-actions">
            <span className="status-badge badge-success" style={{ fontSize: 12 }}>● Policy Active</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>{user.name?.split(' ')[0]}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {activeTab === 'home' && (
          <>
            <Dashboard user={user} />
            <CollapsibleSection icon="🌤️" title="Weather Tracker" description="Live weather in your delivery zone" defaultOpen={false}>
              <WeatherTracker city={user.city} />
            </CollapsibleSection>
            <CollapsibleSection icon="📍" title="Location Tracker" description="Your location & delivery zones" defaultOpen={false}>
              <LocationTracker user={user} />
            </CollapsibleSection>
            <CommunityFeed user={user} />
          </>
        )}

        {activeTab === 'disruptions' && (
          <ParametricTrigger user={user} />
        )}

        {activeTab === 'claims' && (
          <ClaimsSection user={user} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard user={user} />
        )}

        {activeTab === 'profile' && (
          <ProfileSection user={user} onLogout={handleLogout} />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="nav-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* FAB: SOS + Voice */}
      <div className="sos-fab">
        <button className="voice-fab" onClick={() => setShowVoice(true)} title="Voice Assistant">🎙️</button>
        <button className="sos-btn" onClick={() => setShowSOS(true)}>
          <span style={{ fontSize: 16 }}>🆘</span>
          <span style={{ fontSize: 9, letterSpacing: 1 }}>SOS</span>
        </button>
      </div>

      {/* Modals */}
      {showVoice && <VoiceAssistant user={user} onClose={() => setShowVoice(false)} />}
      {showSOS   && <SOSPanel user={user} onClose={() => setShowSOS(false)} />}
    </div>
  );
}

export default App;
