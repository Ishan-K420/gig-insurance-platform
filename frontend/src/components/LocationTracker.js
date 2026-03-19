import React, { useState, useEffect } from 'react';

function LocationTracker({ user }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: Math.round(position.coords.accuracy),
          timestamp: new Date(position.timestamp)
        });
        setLoading(false);
      },
      (error) => {
        setError('Unable to retrieve your location. Please enable location services.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const deliveryZones = [
    { name: 'Andheri West', distance: location ? '2.3 km' : '-', status: 'active' },
    { name: 'Bandra', distance: location ? '5.1 km' : '-', status: 'active' },
    { name: 'Powai', distance: location ? '8.7 km' : '-', status: 'inactive' }
  ];

  return (
    <div>
      {error && (
        <div className="alert alert-warning">
          <span style={{ fontSize: '20px' }}>⚠️</span>
          <div>{error}</div>
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '12px', color: '#64748b' }}>Getting your location...</p>
        </div>
      )}

      {location && !loading && (
        <>
          <div className="info-grid">
            <div className="info-item">
              <div className="label">Latitude</div>
              <div className="value" style={{ fontSize: '18px' }}>
                {location.latitude.toFixed(6)}
              </div>
            </div>

            <div className="info-item">
              <div className="label">Longitude</div>
              <div className="value" style={{ fontSize: '18px' }}>
                {location.longitude.toFixed(6)}
              </div>
            </div>

            <div className="info-item">
              <div className="label">Accuracy</div>
              <div className="value" style={{ fontSize: '18px' }}>
                ±{location.accuracy}m
              </div>
            </div>

            <div className="info-item">
              <div className="label">Last Updated</div>
              <div className="value" style={{ fontSize: '14px' }}>
                {location.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
              📍 Your Delivery Zones
            </h4>
            
            {deliveryZones.map((zone, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>{zone.name}</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>
                    Distance: {zone.distance}
                  </div>
                </div>
                <span className={`status-badge ${zone.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                  {zone.status === 'active' ? '✓ Active' : '○ Inactive'}
                </span>
              </div>
            ))}
          </div>

          <div className="alert alert-info" style={{ marginTop: '20px' }}>
            <span style={{ fontSize: '20px' }}>💡</span>
            <div>
              <strong>Location Tracking Active</strong>
              <div style={{ fontSize: '13px', marginTop: '4px' }}>
                Your location is used to verify claims and calculate zone-based premiums. 
                We never share your location data with third parties.
              </div>
            </div>
          </div>
        </>
      )}

      <button 
        className="btn btn-primary" 
        onClick={getCurrentLocation}
        disabled={loading}
        style={{ width: '100%', marginTop: '16px' }}
      >
        {loading ? 'Getting Location...' : '📍 Update Location'}
      </button>
    </div>
  );
}

export default LocationTracker;
