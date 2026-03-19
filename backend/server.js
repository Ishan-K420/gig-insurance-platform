const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// User registration
app.post('/api/register', async (req, res) => {
  const { phone, name, platform, city, weeklyHours } = req.body;
  
  // TODO: Save to database
  res.json({
    success: true,
    userId: Math.floor(Math.random() * 10000),
    message: 'Registration successful'
  });
});

// Calculate premium
app.post('/api/calculate-premium', async (req, res) => {
  const { userId, location, weeklyHours } = req.body;
  
  // Call ML service
  const premium = 100; // Placeholder
  
  res.json({
    weeklyPremium: premium,
    coverageAmount: 2000,
    breakdown: {
      base: 80,
      locationRisk: 15,
      hoursAdjustment: 5
    }
  });
});

// Get weather data
app.get('/api/weather/:city', async (req, res) => {
  const { city } = req.params;
  
  // Mock weather data
  res.json({
    city,
    temperature: 35,
    rainfall: 0,
    aqi: 150,
    alerts: []
  });
});

// Create policy
app.post('/api/policy', async (req, res) => {
  const { userId, premium, coverage } = req.body;
  
  res.json({
    policyId: Math.floor(Math.random() * 10000),
    weekStart: new Date().toISOString(),
    weekEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active'
  });
});

// Get claims
app.get('/api/claims/:userId', async (req, res) => {
  res.json({
    claims: []
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
