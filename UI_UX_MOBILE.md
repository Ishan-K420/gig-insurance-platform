# UI/UX WIREFRAMES & COMPONENT SPECIFICATIONS

---

## 4. MOBILE WEB PORTAL (PWA) - GIG WORKER INTERFACE

### 4.1 Onboarding Flow

**Screen 1: Welcome & Phone Verification**
```
┌─────────────────────────────────┐
│  🛡️  Gig Shield                 │
│                                 │
│  Income Protection for          │
│  Delivery Partners              │
│                                 │
│  ┌───────────────────────────┐ │
│  │ +91 |___________________|  │ │
│  └───────────────────────────┘ │
│                                 │
│  [Send OTP]                     │
│                                 │
│  ✓ Zero paperwork               │
│  ✓ Instant coverage             │
│  ✓ Weekly payments              │
└─────────────────────────────────┘
```

**Screen 2: OTP Verification**
```
┌─────────────────────────────────┐
│  ← Back                         │
│                                 │
│  Enter OTP sent to              │
│  +91 98765 43210                │
│                                 │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐      │
│  │ 4 │ │ 7 │ │ 2 │ │ 9 │      │
│  └───┘ └───┘ └───┘ └───┘      │
│                                 │
│  Resend OTP in 0:45             │
│                                 │
│  [Verify]                       │
└─────────────────────────────────┘
```

**Screen 3: Profile Setup**
```
┌─────────────────────────────────┐
│  ← Back          Step 1 of 3    │
│                                 │
│  Tell us about yourself         │
│                                 │
│  Full Name                      │
│  ┌───────────────────────────┐ │
│  │ Rajesh Kumar              │ │
│  └───────────────────────────┘ │
│                                 │
│  Delivery Platform              │
│  ┌───────────────────────────┐ │
│  │ ▼ Zomato                  │ │
│  └───────────────────────────┘ │
│                                 │
│  City                           │
│  ┌───────────────────────────┐ │
│  │ ▼ Mumbai                  │ │
│  └───────────────────────────┘ │
│                                 │
│  [Continue]                     │
└─────────────────────────────────┘
```

**Screen 4: Work Details**
```
┌─────────────────────────────────┐
│  ← Back          Step 2 of 3    │
│                                 │
│  Your work pattern              │
│                                 │
│  Average Weekly Hours           │
│  ┌───────────────────────────┐ │
│  │ 55 hours                  │ │
│  └───────────────────────────┘ │
│  ◄────────●──────────────────► │
│  20h              60h       80h │
│                                 │
│  Average Weekly Earnings        │
│  ┌───────────────────────────┐ │
│  │ ₹ 6,500                   │ │
│  └───────────────────────────┘ │
│                                 │
│  Primary Delivery Zones         │
│  ┌───────────────────────────┐ │
│  │ 📍 Andheri West           │ │
│  │ 📍 Bandra                 │ │
│  │ + Add Zone                │ │
│  └───────────────────────────┘ │
│                                 │
│  [Continue]                     │
└─────────────────────────────────┘
```

**Screen 5: KYC Upload**
```
┌─────────────────────────────────┐
│  ← Back          Step 3 of 3    │
│                                 │
│  Quick verification             │
│                                 │
│  Aadhaar Card                   │
│  ┌───────────────────────────┐ │
│  │  📷  Upload Front          │ │
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │  📷  Upload Back           │ │
│  └───────────────────────────┘ │
│                                 │
│  Driving License (Optional)     │
│  ┌───────────────────────────┐ │
│  │  📷  Upload                │ │
│  └───────────────────────────┘ │
│                                 │
│  🔒 Your data is encrypted      │
│     and never shared            │
│                                 │
│  [Complete Setup]               │
└─────────────────────────────────┘
```

---

### 4.2 Weekly Policy Dashboard (Home Screen)

```
┌─────────────────────────────────┐
│  ☰  Gig Shield        🔔 👤     │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │  🛡️ PROTECTED            │   │
│  │                          │   │
│  │  Week 12 Coverage        │   │
│  │  ₹ 2,000                 │   │
│  │                          │   │
│  │  Remaining: ₹1,400       │   │
│  │  ▓▓▓▓▓▓▓░░░ 70%          │   │
│  │                          │   │
│  │  Valid until: 22 Mar     │   │
│  └─────────────────────────┘   │
│                                 │
│  This Week's Premium            │
│  ┌─────────────────────────┐   │
│  │  ₹100 / week             │   │
│  │  [Renew for Next Week]   │   │
│  └─────────────────────────┘   │
│                                 │
│  ⚠️ Weather Alert               │
│  ┌─────────────────────────┐   │
│  │  Heavy rain expected     │   │
│  │  tomorrow 2-5 PM         │   │
│  │  Andheri West            │   │
│  │                          │   │
│  │  You're covered! ✓       │   │
│  └─────────────────────────┘   │
│                                 │
│  Recent Activity                │
│  ┌─────────────────────────┐   │
│  │  ✓ Claim Approved        │   │
│  │  Rain disruption         │   │
│  │  +₹600  •  19 Mar        │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │  ✓ Premium Paid          │   │
│  │  Week 12 coverage        │   │
│  │  -₹100  •  15 Mar        │   │
│  └─────────────────────────┘   │
│                                 │
│  [View All Transactions]        │
│                                 │
└─────────────────────────────────┘
```

---

### 4.3 Parametric Trigger Status Screen

```
┌─────────────────────────────────┐
│  ← Back      Live Protection    │
├─────────────────────────────────┤
│                                 │
│  Your Zones                     │
│  ┌─────────────────────────┐   │
│  │  📍 Andheri West         │   │
│  │  🌧️ Rain: 12mm           │   │
│  │  🌡️ Temp: 32°C           │   │
│  │  💨 AQI: 145 (Moderate)  │   │
│  │  ✓ All Clear             │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │  📍 Bandra               │   │
│  │  🌧️ Rain: 0mm            │   │
│  │  🌡️ Temp: 33°C           │   │
│  │  💨 AQI: 132 (Moderate)  │   │
│  │  ✓ All Clear             │   │
│  └─────────────────────────┘   │
│                                 │
│  Your Coverage Triggers         │
│  ┌─────────────────────────┐   │
│  │  🌧️ Heavy Rain           │   │
│  │  Trigger: >50mm in 3hrs  │   │
│  │  Payout: ₹200/hour       │   │
│  │  Status: Monitoring      │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │  🔥 Extreme Heat         │   │
│  │  Trigger: >43°C for 4hrs │   │
│  │  Payout: ₹150/hour       │   │
│  │  Status: Monitoring      │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │  💨 Severe Pollution     │   │
│  │  Trigger: AQI >400       │   │
│  │  Payout: ₹200/hour       │   │
│  │  Status: Monitoring      │   │
│  └─────────────────────────┘   │
│                                 │
│  Last checked: 2 mins ago       │
│  [Refresh]                      │
│                                 │
└─────────────────────────────────┘
```

---

### 4.4 Wallet & Payouts Screen

```
┌─────────────────────────────────┐
│  ← Back         My Wallet       │
├─────────────────────────────────┤
│                                 │
│  Available Balance              │
│  ┌─────────────────────────┐   │
│  │                          │   │
│  │  ₹ 1,800                 │   │
│  │                          │   │
│  │  [Withdraw to Bank]      │   │
│  └─────────────────────────┘   │
│                                 │
│  This Week's Summary            │
│  ┌─────────────────────────┐   │
│  │  Claims Received  +₹600  │   │
│  │  Premium Paid     -₹100  │   │
│  │  Net Earnings     +₹500  │   │
│  └─────────────────────────┘   │
│                                 │
│  Transaction History            │
│  ┌─────────────────────────┐   │
│  │  19 Mar 2026             │   │
│  │  ✓ Claim Payout          │   │
│  │  Rain disruption         │   │
│  │  Andheri West            │   │
│  │  +₹600                   │   │
│  │  Balance: ₹1,800         │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │  15 Mar 2026             │   │
│  │  ✓ Premium Payment       │   │
│  │  Week 12 coverage        │   │
│  │  -₹100                   │   │
│  │  Balance: ₹1,200         │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │  12 Mar 2026             │   │
│  │  ✓ Claim Payout          │   │
│  │  Heat wave               │   │
│  │  Bandra                  │   │
│  │  +₹450                   │   │
│  │  Balance: ₹1,300         │   │
│  └─────────────────────────┘   │
│                                 │
│  [Load More]                    │
│                                 │
└─────────────────────────────────┘
```

---

### 4.5 Claim Details Screen (Auto-Generated)

```
┌─────────────────────────────────┐
│  ← Back      Claim Details      │
├─────────────────────────────────┤
│                                 │
│  ✓ APPROVED & PAID              │
│                                 │
│  Claim #CLM-2026-03-19-000567   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  Payout Amount           │   │
│  │  ₹ 600                   │   │
│  │                          │   │
│  │  Paid to your wallet     │   │
│  │  19 Mar 2026, 2:08 PM    │   │
│  └─────────────────────────┘   │
│                                 │
│  Disruption Details             │
│  ┌─────────────────────────┐   │
│  │  Type: Heavy Rain        │   │
│  │  Location: Andheri West  │   │
│  │  Detected: 19 Mar, 2:00PM│   │
│  │  Duration: 3 hours       │   │
│  │  Rainfall: 75mm          │   │
│  └─────────────────────────┘   │
│                                 │
│  Payout Calculation             │
│  ┌─────────────────────────┐   │
│  │  Hours Lost: 3           │   │
│  │  Rate: ₹200/hour         │   │
│  │  Total: ₹600             │   │
│  └─────────────────────────┘   │
│                                 │
│  Verification                   │
│  ┌─────────────────────────┐   │
│  │  ✓ Location verified     │   │
│  │  ✓ Time verified         │   │
│  │  ✓ Platform status OK    │   │
│  │  ✓ Fraud check passed    │   │
│  │                          │   │
│  │  Processed in 10 minutes │   │
│  └─────────────────────────┘   │
│                                 │
│  [Download Receipt]             │
│                                 │
└─────────────────────────────────┘
```

---

### 4.6 Premium Breakdown Screen

```
┌─────────────────────────────────┐
│  ← Back    Premium Breakdown    │
├─────────────────────────────────┤
│                                 │
│  Week 13 (23-29 Mar)            │
│                                 │
│  ┌─────────────────────────┐   │
│  │  Your Premium            │   │
│  │  ₹ 105 / week            │   │
│  │                          │   │
│  │  Coverage: ₹2,000        │   │
│  └─────────────────────────┘   │
│                                 │
│  How it's calculated            │
│  ┌─────────────────────────┐   │
│  │  Base Premium      ₹80   │   │
│  │  + Location Risk   ₹18   │   │
│  │  + Hours Bonus     ₹12   │   │
│  │  - Loyalty Disc.   -₹5   │   │
│  │  ─────────────────────   │   │
│  │  Total             ₹105  │   │
│  └─────────────────────────┘   │
│                                 │
│  Why this premium?              │
│  ┌─────────────────────────┐   │
│  │  📍 Your zones have      │   │
│  │     moderate rain risk   │   │
│  │                          │   │
│  │  ⏰ You work 55 hrs/week │   │
│  │     (higher coverage)    │   │
│  │                          │   │
│  │  ⭐ 8 claim-free weeks   │   │
│  │     (loyalty discount)   │   │
│  └─────────────────────────┘   │
│                                 │
│  Next Week Forecast             │
│  ┌─────────────────────────┐   │
│  │  ⚠️ Rain expected        │   │
│  │  Estimated premium: ₹115 │   │
│  └─────────────────────────┘   │
│                                 │
│  [Pay ₹105 for Week 13]         │
│                                 │
└─────────────────────────────────┘
```

