# Phase 1 Quick Start Guide

## Setup Instructions

### 1. ML Service Setup
```bash
cd ml-service
pip install -r requirements.txt
python app.py
# Service runs on http://localhost:8000
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:3000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
# App runs on http://localhost:3001
```

## Testing the Prototype

1. Open http://localhost:3001
2. Fill registration form with sample data
3. View dashboard with calculated premium
4. Weather conditions are simulated

## Phase 1 Demo Video Script

**Duration: 2 minutes**

### Segment 1: Problem Introduction (30 seconds)
- Show statistics: "30% income loss during disruptions"
- Explain food delivery persona
- Highlight weekly earnings cycle

### Segment 2: Solution Overview (45 seconds)
- Show registration flow
- Demonstrate premium calculation
- Explain parametric triggers (rain, heat, AQI)
- Show AI-powered fraud detection

### Segment 3: Technical Architecture (45 seconds)
- Show tech stack diagram
- Explain ML models (premium + fraud)
- Demo weather API integration
- Show database schema

## Next Steps for Phase 2

- [ ] Integrate real weather APIs
- [ ] Build automated claim processing
- [ ] Add GPS validation
- [ ] Create admin dashboard
- [ ] Implement payment gateway (test mode)

## API Endpoints

### ML Service (Port 8000)
- POST /calculate-premium
- POST /detect-fraud
- GET /health

### Backend (Port 3000)
- POST /api/register
- POST /api/calculate-premium
- GET /api/weather/:city
- POST /api/policy
- GET /api/claims/:userId

## Demo Credentials

Use any 10-digit phone number for testing.
Sample cities: Mumbai, Delhi, Bangalore, Hyderabad, Chennai
