import React, { useState, useEffect } from 'react';

function WeatherTracker({ city }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 300000);
    return () => clearInterval(interval);
  }, [city]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      // Using OpenWeatherMap API (you'll need to add your API key)
      const API_KEY = 'demo'; // Replace with actual key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric`
      );
      
      if (response.ok) {
        const data = await response.json();
        setWeather({
          temperature: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          pressure: data.main.pressure
        });
      } else {
        // Fallback to mock data if API fails
        setWeather({
          temperature: 32,
          feelsLike: 35,
          humidity: 65,
          windSpeed: 15,
          description: 'partly cloudy',
          icon: '02d',
          pressure: 1013
        });
      }
    } catch (error) {
      // Mock data as fallback
      setWeather({
        temperature: 32,
        feelsLike: 35,
        humidity: 65,
        windSpeed: 15,
        description: 'partly cloudy',
        icon: '02d',
        pressure: 1013
      });
    }
    setLoading(false);
    setLastUpdated(new Date());
  };

  const getWeatherIcon = (temp) => {
    if (temp > 40) return '🔥';
    if (temp > 35) return '☀️';
    if (temp > 25) return '🌤️';
    return '⛅';
  };

  const getAQIStatus = () => {
    const aqi = Math.floor(Math.random() * 200) + 50; // Mock AQI
    if (aqi > 200) return { level: 'Poor', color: '#ef4444', value: aqi };
    if (aqi > 100) return { level: 'Moderate', color: '#f59e0b', value: aqi };
    return { level: 'Good', color: '#10b981', value: aqi };
  };

  const aqi = getAQIStatus();

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div>
      <div className="info-grid">
        <div className="info-item">
          <div className="label">Temperature</div>
          <div className="value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {getWeatherIcon(weather.temperature)}
            {weather.temperature}°C
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
            Feels like {weather.feelsLike}°C
          </div>
        </div>

        <div className="info-item">
          <div className="label">Humidity</div>
          <div className="value">{weather.humidity}%</div>
          <div className="progress-bar" style={{ marginTop: '8px' }}>
            <div className="progress-fill" style={{ width: `${weather.humidity}%` }}></div>
          </div>
        </div>

        <div className="info-item">
          <div className="label">Wind Speed</div>
          <div className="value">{weather.windSpeed} km/h</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
            {weather.windSpeed > 20 ? 'Windy' : 'Calm'}
          </div>
        </div>

        <div className="info-item">
          <div className="label">Air Quality</div>
          <div className="value" style={{ color: aqi.color }}>{aqi.value}</div>
          <div style={{ fontSize: '12px', color: aqi.color, marginTop: '4px', fontWeight: 500 }}>
            {aqi.level}
          </div>
        </div>
      </div>

      <div className="alert alert-info">
        <span style={{ fontSize: '20px' }}>ℹ️</span>
        <div>
          <strong>Current Conditions:</strong> {weather.description}
          <div style={{ fontSize: '13px', marginTop: '4px', opacity: 0.8 }}>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {weather.temperature > 40 && (
        <div className="alert alert-warning">
          <span style={{ fontSize: '20px' }}>⚠️</span>
          <div>
            <strong>Extreme Heat Warning!</strong>
            <div style={{ fontSize: '13px', marginTop: '4px' }}>
              Temperature above 40°C. Consider taking breaks and staying hydrated.
            </div>
          </div>
        </div>
      )}

      <button className="btn btn-secondary" onClick={fetchWeather} style={{ width: '100%', marginTop: '16px' }}>
        🔄 Refresh Weather
      </button>
    </div>
  );
}

export default WeatherTracker;
