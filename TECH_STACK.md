# TECH STACK & IMPLEMENTATION ROADMAP

---

## 7. RECOMMENDED TECH STACK (6-Week Sprint Optimized)

### 7.1 Frontend Stack

**Framework: Next.js 14 (App Router)**
- **Why:** Server-side rendering, API routes, file-based routing, built-in optimization
- **Deployment:** Vercel (zero-config, instant deployments)
- **PWA Support:** next-pwa plugin for offline capabilities

**UI Library: React 18 + TypeScript**
- **Why:** Type safety, component reusability, large ecosystem
- **State Management:** React Query (TanStack Query) for server state + Zustand for client state
- **Forms:** React Hook Form + Zod validation

**Styling: TailwindCSS + Shadcn/ui**
- **Why:** Rapid prototyping, consistent design system, accessible components
- **Icons:** Lucide React
- **Charts:** Recharts (for analytics dashboard)
- **Maps:** Mapbox GL JS (for zone risk visualization)

**Mobile-First Approach:**
- Responsive breakpoints: 320px (mobile), 768px (tablet), 1024px (desktop)
- Touch-optimized interactions
- PWA manifest for "Add to Home Screen"

---

### 7.2 Backend Stack

**Runtime: Node.js 20 LTS**
- **Framework:** Next.js API Routes (tRPC for type-safe APIs)
- **Alternative:** Express.js (if separate backend needed)

**API Architecture: tRPC**
- **Why:** End-to-end type safety, no code generation, auto-completion
- **Alternative:** REST with OpenAPI/Swagger for documentation

**Authentication:**
- **OTP:** Twilio Verify API (or MSG91 for India)
- **Session:** NextAuth.js with JWT tokens
- **Security:** HTTP-only cookies, CSRF protection

**Background Jobs:**
- **Queue:** BullMQ (Redis-based job queue)
- **Scheduler:** Node-cron for periodic tasks
- **Use Cases:** Weather polling, claim processing, payout execution

---

### 7.3 Database Stack

**Primary Database: MongoDB Atlas (M10 cluster)**
- **Why:** 
  - Flexible schema for rapid iteration
  - Native geospatial queries (2dsphere indexes)
  - JSON-native (matches API responses)
  - Horizontal scaling ready
  - Free tier for development

**ODM: Mongoose**
- **Why:** Schema validation, middleware hooks, query building
- **Alternatives:** Prisma (if prefer SQL-like syntax)

**Caching Layer: Redis (Upstash)**
- **Use Cases:**
  - Session storage
  - API response caching
  - Real-time event queue
  - Rate limiting
- **Why Upstash:** Serverless Redis, pay-per-request, global edge network

**File Storage: AWS S3 (or Cloudflare R2)**
- **Use Cases:** KYC documents, receipts, ML model artifacts
- **Security:** Pre-signed URLs, encryption at rest

---

### 7.4 AI/ML Stack

**ML Service: Python FastAPI (Separate microservice)**
- **Deployment:** Docker container on Railway/Render
- **Why:** Async support, automatic API docs, fast inference

**ML Libraries:**
- **XGBoost:** Premium calculation (gradient boosting)
- **scikit-learn:** Preprocessing, Isolation Forest (fraud detection)
- **TensorFlow/Keras:** LSTM for time-series forecasting (Phase 3)
- **SHAP:** Model explainability

**Model Serving:**
- **Storage:** AWS S3 (versioned model artifacts)
- **Loading:** Lazy loading on service startup
- **Versioning:** Semantic versioning (v1.0, v1.1, etc.)

**Feature Store:**
- **Simple:** MongoDB collection with computed features
- **Advanced:** Feast (if time permits)

---

### 7.5 External Integrations

**Weather APIs:**
- **Primary:** OpenWeatherMap (free tier: 1000 calls/day)
- **Backup:** Weatherstack, Visual Crossing
- **Data:** Temperature, rainfall, AQI, wind speed
- **Polling:** Every 15 minutes for active policy zones

**Payment Gateway:**
- **Razorpay (India-focused)**
  - Instant Payouts API (for claim disbursement)
  - Payment Links (for premium collection)
  - UPI, Cards, Net Banking support
  - Test mode for development
- **Alternative:** Cashfree, Stripe (international)

**SMS/Notifications:**
- **Twilio:** SMS for OTP and claim notifications
- **Firebase Cloud Messaging:** Push notifications (PWA)
- **Alternative:** MSG91 (cheaper for India)

**KYC Verification:**
- **DigiLocker API:** Aadhaar verification (government-backed)
- **Alternative:** Manual verification for MVP

**Mock Platform APIs:**
- **Simulate:** Zomato/Swiggy delivery status
- **Implementation:** JSON files or simple Express endpoints
- **Data:** Active orders, last delivery time, zone activity

---

### 7.6 DevOps & Infrastructure

**Version Control:**
- **GitHub:** Code repository
- **Branching:** main (production), develop (staging), feature/* (development)

**CI/CD:**
- **GitHub Actions:** Automated testing and deployment
- **Workflows:**
  - Run tests on PR
  - Deploy to staging on merge to develop
  - Deploy to production on merge to main

**Hosting:**
- **Frontend:** Vercel (Next.js optimized, global CDN)
- **Backend API:** Vercel Serverless Functions (or Railway)
- **ML Service:** Railway/Render (Docker container)
- **Database:** MongoDB Atlas (managed)
- **Redis:** Upstash (serverless)

**Monitoring:**
- **Application:** Sentry (error tracking)
- **Analytics:** Mixpanel or PostHog (user behavior)
- **Logs:** Vercel Logs + Logtail
- **Uptime:** UptimeRobot (free tier)

**Security:**
- **Secrets:** Environment variables (Vercel/Railway)
- **API Keys:** Never commit to repo, use .env.local
- **HTTPS:** Enforced by default on Vercel
- **Rate Limiting:** Redis-based (10 req/min per IP)

---

## 8. 6-WEEK IMPLEMENTATION ROADMAP

### Week 1: Foundation & Setup (Mar 4-10)
**Goal:** Project setup, database design, basic authentication

**Tasks:**
- [x] Initialize Next.js project with TypeScript
- [x] Setup MongoDB Atlas cluster
- [x] Design database schemas (users, policies, claims)
- [x] Implement OTP-based authentication
- [x] Create basic UI components (buttons, inputs, cards)
- [x] Setup Tailwind + Shadcn/ui
- [x] Deploy to Vercel (staging)

**Deliverables:**
- Working authentication flow
- Database schema documented
- Basic UI component library

---

### Week 2: Core Features - Part 1 (Mar 11-17)
**Goal:** User onboarding, risk profiling, premium calculation

**Tasks:**
- [ ] Build registration flow (phone, profile, KYC)
- [ ] Implement file upload for KYC documents
- [ ] Create ML service (FastAPI) for premium calculation
- [ ] Build simple ML model (decision tree → XGBoost)
- [ ] Integrate weather API (OpenWeatherMap)
- [ ] Calculate location risk scores
- [ ] Display premium breakdown to user

**Deliverables:**
- Complete onboarding flow
- Working premium calculator
- ML service deployed

---

### Week 3: Core Features - Part 2 (Mar 18-24)
**Goal:** Policy creation, parametric triggers, claim automation

**Tasks:**
- [ ] Build policy creation workflow
- [ ] Integrate Razorpay for premium payment
- [ ] Implement parametric trigger system (BullMQ jobs)
- [ ] Create weather polling service (every 15 min)
- [ ] Build rule engine for trigger detection
- [ ] Auto-generate claims on trigger match
- [ ] Display active policy status on dashboard

**Deliverables:**
- Working policy purchase flow
- Automated trigger detection
- Auto-claim generation

---

### Week 4: Claims & Payouts (Mar 25-31)
**Goal:** Fraud detection, claim approval, instant payouts

**Tasks:**
- [ ] Build fraud detection engine (rule-based + ML)
- [ ] Implement location validation (GPS checks)
- [ ] Create claim approval workflow
- [ ] Integrate Razorpay Payouts API
- [ ] Build wallet system
- [ ] Send SMS/push notifications on payout
- [ ] Create claim details screen

**Deliverables:**
- Working fraud detection
- Automated payout system
- Notification system

---

### Week 5: Admin Dashboard (Apr 1-7)
**Goal:** Operator dashboard, analytics, fraud queue

**Tasks:**
- [ ] Build admin authentication
- [ ] Create real-time risk map (Mapbox)
- [ ] Build fraud alert queue
- [ ] Implement manual review workflow
- [ ] Create analytics dashboard (Recharts)
- [ ] Build payout logs table
- [ ] Add export functionality (CSV)

**Deliverables:**
- Complete admin dashboard
- Real-time monitoring tools
- Analytics and reporting

---

### Week 6: Polish & Testing (Apr 8-14)
**Goal:** Testing, optimization, documentation, demo prep

**Tasks:**
- [ ] End-to-end testing (Playwright)
- [ ] Performance optimization (Lighthouse score >90)
- [ ] Security audit (OWASP checklist)
- [ ] Mobile responsiveness testing
- [ ] Create demo data and scenarios
- [ ] Write API documentation
- [ ] Record demo video (5 minutes)
- [ ] Create pitch deck

**Deliverables:**
- Production-ready application
- Demo video
- Pitch deck
- Documentation

---

## 9. DEVELOPMENT BEST PRACTICES

### 9.1 Code Organization

```
gig-insurance-platform/
├── frontend/                    # Next.js application
│   ├── app/                     # App router pages
│   │   ├── (auth)/              # Auth group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (worker)/            # Worker portal group
│   │   │   ├── dashboard/
│   │   │   ├── policy/
│   │   │   ├── claims/
│   │   │   └── wallet/
│   │   ├── (admin)/             # Admin dashboard group
│   │   │   ├── dashboard/
│   │   │   ├── policies/
│   │   │   ├── claims/
│   │   │   └── analytics/
│   │   └── api/                 # API routes
│   │       └── trpc/
│   ├── components/              # React components
│   │   ├── ui/                  # Shadcn components
│   │   ├── worker/              # Worker-specific
│   │   └── admin/               # Admin-specific
│   ├── lib/                     # Utilities
│   │   ├── db.ts                # MongoDB connection
│   │   ├── redis.ts             # Redis client
│   │   └── utils.ts
│   ├── server/                  # tRPC server
│   │   ├── routers/
│   │   └── trpc.ts
│   └── types/                   # TypeScript types
│
├── ml-service/                  # Python ML service
│   ├── app.py                   # FastAPI app
│   ├── models/
│   │   ├── premium_calculator.py
│   │   └── fraud_detector.py
│   ├── data/
│   │   └── training_data/
│   ├── requirements.txt
│   └── Dockerfile
│
├── scripts/                     # Utility scripts
│   ├── seed-db.ts               # Seed test data
│   └── train-models.py          # Train ML models
│
└── docs/                        # Documentation
    ├── API.md
    ├── DATABASE.md
    └── DEPLOYMENT.md
```

### 9.2 Environment Variables

```bash
# .env.local (Frontend)
DATABASE_URL=mongodb+srv://...
REDIS_URL=redis://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

# External APIs
OPENWEATHER_API_KEY=...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...

# ML Service
ML_SERVICE_URL=http://localhost:8000

# Admin
ADMIN_EMAIL=admin@gigshield.com
```

### 9.3 Testing Strategy

**Unit Tests:**
- ML models: pytest
- API routes: Jest + Supertest
- Components: React Testing Library

**Integration Tests:**
- API workflows: Postman/Newman
- Database operations: MongoDB Memory Server

**E2E Tests:**
- User flows: Playwright
- Critical paths: Registration → Policy → Claim → Payout

**Performance Tests:**
- Load testing: k6
- API response time: <200ms (p95)
- Page load: <2s (Lighthouse)

---

## 10. RISK MITIGATION

### 10.1 Technical Risks

**Risk:** Weather API rate limits
**Mitigation:** Cache responses (15 min), use multiple providers, implement fallback

**Risk:** Payment gateway downtime
**Mitigation:** Queue payouts, retry logic, manual fallback

**Risk:** ML model accuracy
**Mitigation:** Start with rule-based, gradually introduce ML, A/B testing

**Risk:** Database scaling
**Mitigation:** MongoDB sharding ready, Redis caching, CDN for static assets

### 10.2 Business Risks

**Risk:** High fraud rate
**Mitigation:** Multi-layer detection, manual review queue, user reputation system

**Risk:** Loss ratio >80%
**Mitigation:** Dynamic pricing, coverage limits, reinsurance simulation

**Risk:** Low user adoption
**Mitigation:** Simple onboarding, transparent pricing, instant payouts

---

## 11. SUCCESS METRICS

### 11.1 Technical KPIs
- API response time: <200ms (p95)
- Uptime: >99.5%
- Fraud detection accuracy: >95%
- Claim processing time: <10 minutes
- Page load time: <2 seconds

### 11.2 Business KPIs
- User registration conversion: >60%
- Policy renewal rate: >80%
- Loss ratio: 65-70%
- Average premium: ₹100/week
- Claim approval rate: >90%

### 11.3 User Experience KPIs
- Onboarding completion: <3 minutes
- Mobile Lighthouse score: >90
- User satisfaction: >4.5/5
- Support tickets: <5% of users

---

## 12. POST-HACKATHON ROADMAP

### Phase 4: Production Hardening
- Real KYC integration (DigiLocker)
- Actual platform API partnerships (Zomato/Swiggy)
- Advanced ML models (LSTM forecasting)
- Multi-language support (Hindi, Tamil, etc.)
- Voice interface for low-literacy users

### Phase 5: Scale & Expansion
- Expand to other gig segments (Uber, Ola, Urban Company)
- B2B partnerships with platforms
- Reinsurance integration
- Regulatory compliance (IRDAI approval)
- Mobile native apps (React Native)

