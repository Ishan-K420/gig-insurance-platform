# AI-Powered Parametric Insurance for Gig Delivery Workers

## 🎯 Project Overview

An AI-enabled parametric insurance platform protecting food delivery partners (Zomato/Swiggy) against income loss from external disruptions like extreme weather, pollution, and social events.

## 👤 Chosen Persona: Food Delivery Partners

Why Food Delivery?
- High exposure to weather disruptions (rain, heat, pollution)
- Time-sensitive deliveries affected by traffic and zone closures
- Weekly earnings cycle (₹4,000-₹8,000/week average)
- Large workforce across urban India

Typical Scenarios:
1. Heavy Rain: Unable to deliver for 4-6 hours, loses ₹600-900
2. Extreme Heat (>42°C): Reduced orders, early stoppage, loses ₹400-600
3. Severe AQI (>400): Health risk, cannot work, loses ₹800-1200
4. Local Curfew/Strike: Zone inaccessible, loses full day earnings ₹1000-1500

## 💰 Weekly Premium Model

### Pricing Structure
- Base Weekly Premium: ₹50-₹150 per week
- Coverage: Up to ₹2,000 per week (50% of average weekly earnings)
- Dynamic Factors:
  - Location risk score (monsoon-prone areas +20%)
  - Historical weather patterns (-10% for stable zones)
  - Worker's average weekly hours (+15% for 60+ hours/week)
  - Seasonal adjustments (monsoon season +25%)

### Example Calculation
```
Base Premium: ₹80
+ Location Risk (Mumbai, Monsoon): +₹16
+ High Hours (65 hrs/week): +₹12
- Good History (no claims 8 weeks): -₹8
= Weekly Premium: ₹100
```

## 🔔 Parametric Triggers (Income Loss Only)

### 1. Weather-Based Triggers
- Heavy Rain: >50mm in 3 hours → Auto-claim ₹200/hour lost
- Extreme Heat: Temperature >43°C for 4+ hours → ₹150/hour
- Severe AQI: AQI >400 for 6+ hours → ₹200/hour

### 2. Social Disruption Triggers
- Curfew/Strike: Government notifications → Full day coverage
- Zone Closure: Platform API shows area shutdown → Hourly payout

### 3. Platform Disruption Triggers
- App Downtime: >2 hours during peak (12-2pm, 7-10pm) → ₹300/hour

## 🤖 AI/ML Integration Strategy

### 1. Dynamic Premium Calculation
Model: Gradient Boosting (XGBoost)
Features:
- Historical weather data (last 52 weeks)
- Location coordinates (lat/long)
- Worker's weekly hours, earnings pattern
- Seasonal indicators
- Local event calendar

Output: Personalized weekly premium (₹50-₹150 range)

### 2. Fraud Detection System
Model: Isolation Forest + Rule-Based System
Detection Mechanisms:
- GPS validation (delivery location vs claim location)
- Temporal anomaly (claim timing vs actual weather event)
- Pattern detection (repeated claims same day/time)
- Cross-verification with platform APIs
- Duplicate claim prevention (blockchain hash)

Fraud Indicators:
- Location mismatch >5km from weather event
- Claim submitted >24 hours after event
- Worker marked "active" on platform during claimed disruption
- Historical pattern of suspicious claims

### 3. Predictive Risk Modeling
Model: LSTM Time Series
Purpose: Forecast next week's disruption probability
Use Case: Proactive notifications, dynamic pricing adjustments

## 🏗️ Platform Choice: Progressive Web App (PWA)

Rationale:
- No app store friction (instant access via link)
- Works offline (critical for low connectivity)
- Push notifications for claim approvals
- Lower development cost (single codebase)
- Easy updates without app store approval

## 🛠️ Tech Stack

### Frontend
- Framework: React.js with PWA capabilities
- UI Library: Material-UI (mobile-first design)
- State Management: Redux Toolkit
- Maps: Google Maps API (location validation)

### Backend
- Runtime: Node.js with Express
- Database: PostgreSQL (transactional data) + Redis (caching)
- AI/ML: Python FastAPI microservice
- ML Libraries: scikit-learn, XGBoost, TensorFlow

### AI/ML Pipeline
- Training: Python (Jupyter notebooks)
- Deployment: FastAPI + Docker
- Model Storage: AWS S3 / Local storage
- Inference: REST API endpoints

### Integrations
- Weather: OpenWeatherMap API (free tier)
- AQI: IQAir API / Government CPCB data
- Payment: Razorpay (test mode)
- SMS/Notifications: Twilio (trial) / Firebase Cloud Messaging
- Platform APIs: Mock Zomato/Swiggy APIs (simulated)

### DevOps
- Version Control: GitHub
- CI/CD: GitHub Actions
- Containerization: Docker
- Hosting: AWS EC2 / Vercel (frontend) + Railway (backend)

## 📋 Phase 1 Prototype Scope (Minimal)

### Week 1-2 Deliverables:
1. User Registration Flow
   - Basic form: Name, phone, delivery platform, city, weekly hours
   - OTP verification (simulated)

2. Risk Assessment Demo
   - Simple ML model (decision tree) for premium calculation
   - Input: Location + weekly hours → Output: Weekly premium

3. Dashboard Mockup
   - Display: Current coverage, premium amount, active status
   - Simple UI showing "Protected" status

4. Single Parametric Trigger
   - Weather API integration
   - If rain >50mm detected → Show "Claim Eligible" notification

## 📊 Development Plan

### Week 1 (March 4-10): Research & Design
- [x] Persona research and scenario mapping
- [x] Premium model design
- [x] Tech stack finalization
- [ ] Database schema design
- [ ] API architecture design
- [ ] UI/UX wireframes

### Week 2 (March 11-20): Foundation Build
- [ ] Setup project repository
- [ ] Basic frontend (registration + dashboard)
- [ ] Backend API structure
- [ ] Simple ML model for premium calculation
- [ ] Weather API integration
- [ ] Phase 1 demo video

### Week 3-4 (March 21-April 4): Core Features
- [ ] Complete registration with KYC
- [ ] Policy creation and management
- [ ] Advanced ML models (XGBoost)
- [ ] 3-5 parametric triggers
- [ ] Automated claim initiation
- [ ] Basic fraud detection

### Week 5-6 (April 5-17): Advanced Features
- [ ] Advanced fraud detection (GPS, patterns)
- [ ] Payment gateway integration
- [ ] Admin dashboard with analytics
- [ ] Predictive modeling
- [ ] Performance optimization
- [ ] Final demo and pitch deck

## 🎯 Success Metrics

### For Workers
- Claim approval time: <5 minutes (automated)
- Payout time: <1 hour (simulated)
- Premium affordability: <3% of weekly earnings

### For Platform
- Fraud detection accuracy: >95%
- False positive rate: <5%
- Loss ratio: 60-70% (sustainable)
- User onboarding time: <3 minutes

## 🔐 Key Differentiators

1. Hyper-Local Risk Pricing: Ward-level weather and disruption data
2. Zero-Touch Claims: Fully automated trigger-based payouts
3. Weekly Flexibility: Can pause/resume coverage week-to-week
4. Transparent AI: Explainable premium calculations
5. Blockchain Verification: Immutable claim records

## 📝 Compliance & Ethics

- Data privacy: GDPR-compliant data handling
- Transparent pricing: Clear premium breakdown
- Fair claims: No arbitrary rejections
- Financial inclusion: Affordable for low-income workers

## 🚀 Future Enhancements (Post-Hackathon)

- Multi-language support (Hindi, Tamil, Telugu, Bengali)
- Voice-based interface for low-literacy users
- Community pooling (group discounts)
- Savings wallet (unused coverage → savings)
- Integration with actual platform APIs (Zomato, Swiggy)

---

Repository: [GitHub Link - To be added]  
Demo Video: [Video Link - To be added]  
Team Contact: [Contact Details]


