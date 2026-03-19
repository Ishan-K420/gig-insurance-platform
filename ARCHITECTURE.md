# AI-Powered Parametric Insurance Platform
## Enterprise Architecture Blueprint

---

## 1. SYSTEM ARCHITECTURE & DATA FLOW

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│  Mobile Web (PWA)              │    Desktop Dashboard           │
│  - Next.js 14 (App Router)     │    - Next.js 14 Admin Portal  │
│  - TailwindCSS + Shadcn/ui     │    - Recharts + Mapbox GL     │
│  - React Query (State)         │    - Real-time WebSocket      │
└─────────────────────────────────────────────────────────────────┘
                              ↓ ↑
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│  Next.js API Routes + tRPC (Type-safe APIs)                     │
│  - Authentication Middleware (JWT + OTP)                        │
│  - Rate Limiting (Redis)                                        │
│  - Request Validation (Zod schemas)                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓ ↑
┌─────────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│  Node.js Microservices (Serverless Functions)                   │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐ │
│  │ Policy       │ Risk         │ Claims       │ Fraud        │ │
│  │ Service      │ Engine       │ Processor    │ Detector     │ │
│  └──────────────┴──────────────┴──────────────┴──────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓ ↑
┌─────────────────────────────────────────────────────────────────┐
│                      AI/ML INFERENCE LAYER                      │
├─────────────────────────────────────────────────────────────────┤
│  Python FastAPI Microservices (Containerized)                   │
│  ┌──────────────────────┬────────────────────────────────────┐ │
│  │ Premium Calculator   │  Fraud Detection Engine            │ │
│  │ - XGBoost Model      │  - Isolation Forest                │ │
│  │ - Feature Store      │  - LSTM Anomaly Detection          │ │
│  └──────────────────────┴────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓ ↑
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                │
├─────────────────────────────────────────────────────────────────┤
│  MongoDB Atlas (Primary)    │  Redis (Cache + Queue)           │
│  - User Profiles            │  - Session Store                 │
│  - Weekly Policies          │  - Real-time Events              │
│  - Claims & Payouts         │  - Job Queue (BullMQ)            │
│  - Disruption Events        │                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓ ↑
┌─────────────────────────────────────────────────────────────────┐
│                   EXTERNAL INTEGRATIONS                         │
├─────────────────────────────────────────────────────────────────┤
│  Weather APIs    │  Payment Gateway  │  SMS/Notification       │
│  - OpenWeather   │  - Razorpay       │  - Twilio               │
│  - Weatherstack  │  - Cashfree       │  - Firebase FCM         │
│  Traffic/Social  │  KYC Services     │  Analytics              │
│  - Mock APIs     │  - DigiLocker     │  - Mixpanel             │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Event-Driven Parametric Trigger System

**Real-Time Polling Architecture:**

```
┌─────────────────────────────────────────────────────────────────┐
│              PARAMETRIC TRIGGER ORCHESTRATOR                    │
│                  (Node.js Cron Jobs + BullMQ)                   │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ↓                     ↓                     ↓
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ Weather       │    │ Traffic       │    │ Social        │
│ Poller        │    │ Poller        │    │ Event Poller  │
│ (Every 15min) │    │ (Every 30min) │    │ (Every 5min)  │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ↓
                    ┌──────────────────┐
                    │ Event Aggregator │
                    │ (Redis Stream)   │
                    └──────────────────┘
                              ↓
                    ┌──────────────────┐
                    │ Rule Engine      │
                    │ (Drools/JSON)    │
                    └──────────────────┘
                              ↓
        ┌─────────────────────┼─────────────────────┐
        ↓                     ↓                     ↓
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ Match Active  │    │ Calculate     │    │ Fraud Check   │
│ Policies      │    │ Payout Amount │    │ (ML Model)    │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ↓
                    ┌──────────────────┐
                    │ Auto-Claim       │
                    │ Initiator        │
                    └──────────────────┘
                              ↓
                    ┌──────────────────┐
                    │ Instant Payout   │
                    │ Processor        │
                    └──────────────────┘
                              ↓
                    ┌──────────────────┐
                    │ Push Notification│
                    │ to Worker        │
                    └──────────────────┘
```

**Data Flow Example (Heavy Rain Trigger):**

1. **T+0min:** Weather Poller fetches data for all active policy zones
2. **T+1min:** Detects rainfall >50mm in Andheri West, Mumbai
3. **T+2min:** Event Aggregator creates disruption event document
4. **T+3min:** Rule Engine queries MongoDB for active policies in 5km radius
5. **T+4min:** Finds 47 active policies, calculates ₹200/hour × 3 hours = ₹600 each
6. **T+5min:** Fraud Detector validates GPS history, platform activity logs
7. **T+6min:** Auto-creates 47 claim documents with status "approved"
8. **T+7min:** Payout Processor initiates Razorpay bulk transfer
9. **T+8min:** Updates policy ledger, sends SMS + push notification
10. **T+10min:** Worker sees ₹600 in wallet, notification: "Rain claim approved"

---

## 2. DATABASE DATA MODELS (MongoDB)

### 2.1 Core Collections

#### Collection: `users`
```javascript
{
  _id: ObjectId("..."),
  phone: "+919876543210",  // Unique index
  phoneVerified: true,
  profile: {
    fullName: "Rajesh Kumar",
    deliveryPlatform: "zomato",  // enum: zomato, swiggy
    platformId: "ZOM123456",  // Optional verification
    city: "Mumbai",
    primaryZones: [
      {
        name: "Andheri West",
        coordinates: { lat: 19.1334, lng: 72.8397 },
        radiusKm: 3
      }
    ],
    avgWeeklyHours: 55,
    avgWeeklyEarnings: 6500,
    vehicleType: "bike",  // bike, scooter, bicycle
    joinedAt: ISODate("2026-03-01T00:00:00Z")
  },
  kyc: {
    status: "verified",  // pending, verified, rejected
    aadhaarHash: "sha256_hash",  // Never store actual Aadhaar
    drivingLicenseHash: "sha256_hash",
    verifiedAt: ISODate("2026-03-02T00:00:00Z")
  },
  wallet: {
    balance: 1200.00,
    currency: "INR",
    razorpayContactId: "cont_xxx",
    razorpayFundAccountId: "fa_xxx"
  },
  riskProfile: {
    riskScore: 72.5,  // 0-100, calculated by ML
    lastCalculated: ISODate("2026-03-19T00:00:00Z"),
    factors: {
      locationRisk: 75,
      seasonalRisk: 80,
      historicalClaims: 2,
      platformTenure: 24  // months
    }
  },
  metadata: {
    createdAt: ISODate("2026-03-01T00:00:00Z"),
    updatedAt: ISODate("2026-03-19T00:00:00Z"),
    lastLoginAt: ISODate("2026-03-19T12:00:00Z"),
    deviceInfo: {
      userAgent: "...",
      ipAddress: "103.x.x.x"
    }
  }
}
```

**Indexes:**
- `phone` (unique)
- `profile.city` + `profile.primaryZones.coordinates` (geospatial 2dsphere)
- `riskProfile.riskScore`

---

#### Collection: `weekly_policies`
```javascript
{
  _id: ObjectId("..."),
  policyNumber: "POL-2026-W12-000123",  // Unique
  userId: ObjectId("..."),  // Reference to users
  
  coverage: {
    weekNumber: 12,  // ISO week number
    weekStartDate: ISODate("2026-03-16T00:00:00Z"),  // Monday 00:00
    weekEndDate: ISODate("2026-03-22T23:59:59Z"),    // Sunday 23:59
    
    premium: {
      baseAmount: 85.00,
      adjustments: {
        locationRisk: +18.00,
        hoursBonus: +12.00,
        loyaltyDiscount: -5.00,
        seasonalMultiplier: 1.15
      },
      finalAmount: 110.00,
      calculatedBy: "ml_model_v2.3",
      calculatedAt: ISODate("2026-03-15T18:00:00Z")
    },
    
    coverageAmount: 2000.00,  // Max payout for the week
    remainingCoverage: 1400.00,  // After claims
    
    coveredDisruptions: [
      {
        type: "heavy_rain",
        threshold: { rainfall_mm: 50, duration_hours: 3 },
        payoutPerHour: 200
      },
      {
        type: "extreme_heat",
        threshold: { temperature_celsius: 43, duration_hours: 4 },
        payoutPerHour: 150
      },
      {
        type: "severe_aqi",
        threshold: { aqi_value: 400, duration_hours: 6 },
        payoutPerHour: 200
      },
      {
        type: "zone_closure",
        threshold: { official_notification: true },
        payoutType: "full_day",
        payoutAmount: 1000
      }
    ]
  },
  
  payment: {
    status: "paid",  // pending, paid, failed, refunded
    method: "upi",
    transactionId: "razorpay_xxx",
    paidAt: ISODate("2026-03-15T18:30:00Z"),
    receiptUrl: "https://..."
  },
  
  status: "active",  // active, expired, claimed_out, cancelled
  
  claims: [
    ObjectId("claim_1"),  // References to claims collection
    ObjectId("claim_2")
  ],
  
  metadata: {
    createdAt: ISODate("2026-03-15T18:00:00Z"),
    activatedAt: ISODate("2026-03-16T00:00:00Z"),
    expiresAt: ISODate("2026-03-22T23:59:59Z")
  }
}
```

**Indexes:**
- `policyNumber` (unique)
- `userId` + `coverage.weekStartDate`
- `status` + `coverage.weekStartDate` (for active policy queries)
- `coverage.weekStartDate` + `coverage.weekEndDate` (range queries)

---

#### Collection: `disruption_events`
```javascript
{
  _id: ObjectId("..."),
  eventId: "EVT-2026-03-19-001234",  // Unique
  
  type: "heavy_rain",  // enum: heavy_rain, extreme_heat, severe_aqi, zone_closure, curfew
  
  location: {
    city: "Mumbai",
    zone: "Andheri West",
    coordinates: { lat: 19.1334, lng: 72.8397 },
    affectedRadiusKm: 5
  },
  
  metrics: {
    rainfall_mm: 75,
    temperature_celsius: null,
    aqi_value: null,
    windSpeed_kmh: 45
  },
  
  timing: {
    detectedAt: ISODate("2026-03-19T14:00:00Z"),
    startedAt: ISODate("2026-03-19T13:45:00Z"),
    endedAt: ISODate("2026-03-19T17:00:00Z"),  // null if ongoing
    durationHours: 3.25
  },
  
  source: {
    provider: "openweathermap",
    apiEndpoint: "/data/2.5/weather",
    rawData: { /* original API response */ },
    confidence: 0.95
  },
  
  impact: {
    affectedPolicies: 47,
    totalPayoutAmount: 28200.00,
    autoClaimsGenerated: 47,
    fraudRejections: 0
  },
  
  status: "processed",  // detected, processing, processed, expired
  
  metadata: {
    createdAt: ISODate("2026-03-19T14:00:00Z"),
    processedAt: ISODate("2026-03-19T14:10:00Z")
  }
}
```

**Indexes:**
- `eventId` (unique)
- `location.coordinates` (geospatial 2dsphere)
- `timing.detectedAt` + `status`
- `type` + `location.city`

---

#### Collection: `claims`
```javascript
{
  _id: ObjectId("..."),
  claimNumber: "CLM-2026-03-19-000567",  // Unique
  
  policyId: ObjectId("..."),  // Reference to weekly_policies
  userId: ObjectId("..."),
  disruptionEventId: ObjectId("..."),  // Reference to disruption_events
  
  trigger: {
    type: "heavy_rain",
    detectedAt: ISODate("2026-03-19T14:00:00Z"),
    location: {
      coordinates: { lat: 19.1334, lng: 72.8397 },
      zone: "Andheri West"
    },
    metrics: {
      rainfall_mm: 75,
      duration_hours: 3.25
    }
  },
  
  calculation: {
    hoursLost: 3,
    payoutPerHour: 200,
    totalAmount: 600.00,
    calculationMethod: "parametric_auto",
    calculatedAt: ISODate("2026-03-19T14:05:00Z")
  },
  
  fraudCheck: {
    score: 0.15,  // 0-1, lower is safer
    status: "passed",  // passed, flagged, rejected
    checks: {
      locationValidation: {
        passed: true,
        workerLocation: { lat: 19.1340, lng: 72.8390 },
        distanceFromEvent: 0.8  // km
      },
      platformActivity: {
        passed: true,
        wasActiveOnPlatform: false,  // Good - not working during disruption
        lastOrderTime: ISODate("2026-03-19T13:30:00Z")
      },
      temporalAnomaly: {
        passed: true,
        claimSubmittedWithin: 10  // minutes of detection
      },
      duplicateCheck: {
        passed: true,
        similarClaimsInWindow: 0
      },
      historicalPattern: {
        passed: true,
        claimsLast30Days: 1,
        averageClaimInterval: 15  // days
      }
    },
    mlModelVersion: "fraud_detector_v1.2",
    checkedAt: ISODate("2026-03-19T14:06:00Z")
  },
  
  approval: {
    status: "approved",  // pending, approved, rejected, appealed
    approvedBy: "system_auto",  // system_auto or admin_user_id
    approvedAt: ISODate("2026-03-19T14:07:00Z"),
    rejectionReason: null
  },
  
  payout: {
    amount: 600.00,
    status: "completed",  // pending, processing, completed, failed
    method: "razorpay_instant",
    transactionId: "payout_xxx",
    razorpayPayoutId: "pout_xxx",
    processedAt: ISODate("2026-03-19T14:08:00Z"),
    failureReason: null
  },
  
  notifications: {
    sms: {
      sent: true,
      sentAt: ISODate("2026-03-19T14:09:00Z"),
      messageId: "twilio_xxx"
    },
    push: {
      sent: true,
      sentAt: ISODate("2026-03-19T14:09:00Z")
    }
  },
  
  metadata: {
    createdAt: ISODate("2026-03-19T14:05:00Z"),
    updatedAt: ISODate("2026-03-19T14:09:00Z"),
    processingTimeSeconds: 240
  }
}
```

**Indexes:**
- `claimNumber` (unique)
- `userId` + `metadata.createdAt`
- `policyId`
- `approval.status` + `payout.status`
- `fraudCheck.status`

---

#### Collection: `payout_ledger`
```javascript
{
  _id: ObjectId("..."),
  
  userId: ObjectId("..."),
  claimId: ObjectId("..."),  // null for premium payments
  
  transactionType: "claim_payout",  // claim_payout, premium_payment, refund, withdrawal
  
  amount: 600.00,
  currency: "INR",
  
  direction: "credit",  // credit (money in), debit (money out)
  
  balanceBefore: 1200.00,
  balanceAfter: 1800.00,
  
  paymentGateway: {
    provider: "razorpay",
    transactionId: "payout_xxx",
    status: "success",
    processedAt: ISODate("2026-03-19T14:08:00Z")
  },
  
  metadata: {
    createdAt: ISODate("2026-03-19T14:08:00Z"),
    description: "Rain disruption claim payout - Andheri West"
  }
}
```

**Indexes:**
- `userId` + `metadata.createdAt`
- `transactionType` + `direction`
- `paymentGateway.transactionId` (unique)

---

### 2.2 Relationships & Data Integrity

```
users (1) ──────< (many) weekly_policies
  │                         │
  │                         │
  └──────< (many) claims <──┘
                   │
                   │
                   └────> (1) disruption_events
                   │
                   └────> (1) payout_ledger
```

**Referential Integrity Strategy:**
- Use MongoDB transactions for multi-document operations
- Implement soft deletes (status flags) instead of hard deletes
- Maintain audit trails in metadata fields
- Use change streams for real-time sync to analytics DB

