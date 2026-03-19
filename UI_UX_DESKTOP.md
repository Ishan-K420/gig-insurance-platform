# OPERATOR DASHBOARD - DESKTOP WEB INTERFACE

---

## 5. ADMIN/OPERATOR DASHBOARD (Desktop)

### 5.1 Main Dashboard Overview

```
┌────────────────────────────────────────────────────────────────────────────┐
│  Gig Shield Admin    [Dashboard] [Policies] [Claims] [Users] [Analytics]  │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Week 12 (16-22 Mar 2026)                          Admin: Priya Sharma ▼  │
│                                                                            │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐           │
│  │ Active       │ Claims       │ Payouts      │ Loss Ratio   │           │
│  │ Policies     │ This Week    │ Processed    │              │           │
│  │              │              │              │              │           │
│  │  2,847       │    156       │   ₹93,600    │    68.5%     │           │
│  │  ↑ 12%       │   ↑ 23%      │   ↑ 18%      │   ↓ 2.1%     │           │
│  └──────────────┴──────────────┴──────────────┴──────────────┘           │
│                                                                            │
│  ┌─────────────────────────────────────┬──────────────────────────────┐  │
│  │  Real-Time Zone Risk Map            │  Fraud Alert Queue           │  │
│  │                                     │                              │  │
│  │  [Interactive Map - Mumbai]         │  🚨 High Priority (3)        │  │
│  │                                     │  ┌────────────────────────┐  │  │
│  │  🔴 Andheri West (High Risk)        │  │ CLM-567 • Rajesh K.    │  │  │
│  │     75mm rain • 47 policies         │  │ Score: 0.85            │  │  │
│  │                                     │  │ Location mismatch      │  │  │
│  │  🟡 Bandra (Medium Risk)            │  │ [Review]               │  │  │
│  │     32mm rain • 23 policies         │  │                        │  │  │
│  │                                     │  └────────────────────────┘  │  │
│  │  🟢 Powai (Low Risk)                │  ⚠️ Medium Priority (7)      │  │
│  │     Clear • 89 policies             │  ✓ Low Priority (12)         │  │
│  │                                     │                              │  │
│  │  [View Full Map]                    │  [View All Alerts]           │  │
│  └─────────────────────────────────────┴──────────────────────────────┘  │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  Automated Payout Logs (Last 24 Hours)                              │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │  Time      Event Type    Zone          Policies  Amount   Status    │  │
│  │  14:08     Heavy Rain    Andheri W.    47        ₹28,200  ✓ Paid   │  │
│  │  11:23     Extreme Heat  Bandra        12        ₹5,400   ✓ Paid   │  │
│  │  09:45     High AQI      Dadar         8         ₹4,800   ✓ Paid   │  │
│  │  08:12     Zone Closure  Kurla         3         ₹3,000   ✓ Paid   │  │
│  │                                                                      │  │
│  │  [Export Report] [View All]                                         │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 5.2 Real-Time Zone Risk Map (Detailed View)

```
┌────────────────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                    Real-Time Risk Map                 │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  City: Mumbai ▼    Date: 19 Mar 2026    Time: 14:30    [Auto-Refresh: ON] │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │                                                                      │ │
│  │                    [Interactive Mapbox GL Map]                       │ │
│  │                                                                      │ │
│  │    🔴 Andheri West                                                   │ │
│  │       Rainfall: 75mm (last 3h)                                       │ │
│  │       Active Policies: 47                                            │ │
│  │       Estimated Payout: ₹28,200                                      │ │
│  │       Status: Claims Auto-Generated                                  │ │
│  │                                                                      │ │
│  │    🟡 Bandra                                                         │ │
│  │       Rainfall: 32mm (last 2h)                                       │ │
│  │       Active Policies: 23                                            │ │
│  │       Status: Monitoring (Below threshold)                           │ │
│  │                                                                      │ │
│  │    🟢 Powai                                                          │ │
│  │       Clear weather                                                  │ │
│  │       Active Policies: 89                                            │ │
│  │       Status: Normal                                                 │ │
│  │                                                                      │ │
│  │    🟣 Thane                                                          │ │
│  │       AQI: 425 (Severe)                                              │ │
│  │       Active Policies: 34                                            │ │
│  │       Estimated Payout: ₹20,400                                      │ │
│  │       Status: Claims Auto-Generated                                  │ │
│  │                                                                      │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│  Legend:  🔴 High Risk (Active Claims)  🟡 Medium Risk (Monitoring)        │
│           🟢 Low Risk (Normal)  🟣 Pollution Event                         │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │  Live Weather Data (Updated 2 mins ago)                              │ │
│  ├──────────────────────────────────────────────────────────────────────┤ │
│  │  Zone           Temp    Rain    AQI    Wind    Policies  Risk Level  │ │
│  │  Andheri West   32°C    75mm    145    45km/h  47        🔴 High     │ │
│  │  Bandra         33°C    32mm    132    38km/h  23        🟡 Medium   │ │
│  │  Powai          34°C    0mm     128    22km/h  89        🟢 Low      │ │
│  │  Thane          31°C    12mm    425    28km/h  34        🟣 Severe   │ │
│  │  Dadar          33°C    18mm    156    32km/h  56        🟢 Low      │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│  [Export Map] [Download Report] [Configure Alerts]                        │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 5.3 Fraud Alert Queue (Detailed View)

```
┌────────────────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                    Fraud Detection Queue              │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Filters: [All] [High Priority] [Medium] [Low]    Search: [_________] 🔍  │
│                                                                            │
│  🚨 HIGH PRIORITY ALERTS (3)                                               │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │  Claim #CLM-2026-03-19-000568                    Fraud Score: 0.85   │ │
│  │  User: Rajesh Kumar (+91 98765 43210)           Submitted: 14:15     │ │
│  │                                                                      │ │
│  │  Disruption: Heavy Rain • Andheri West • 19 Mar 14:00               │ │
│  │  Claim Amount: ₹600                                                  │ │
│  │                                                                      │ │
│  │  ⚠️ Fraud Indicators:                                                │ │
│  │  • Location Mismatch: Worker 8.2km from event (Score: 0.35)         │ │
│  │  • Platform Active: User was delivering during disruption (0.40)    │ │
│  │  • Timing Anomaly: Claim submitted 26 hours late (0.25)             │ │
│  │                                                                      │ │
│  │  GPS Logs: [View Map] • Platform Activity: [View Details]           │ │
│  │                                                                      │ │
│  │  [Approve] [Reject] [Request More Info] [View Full Analysis]        │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │  Claim #CLM-2026-03-19-000571                    Fraud Score: 0.78   │ │
│  │  User: Amit Patel (+91 98765 12345)             Submitted: 15:22     │ │
│  │                                                                      │ │
│  │  Disruption: Extreme Heat • Bandra • 19 Mar 12:00                   │ │
│  │  Claim Amount: ₹450                                                  │ │
│  │                                                                      │ │
│  │  ⚠️ Fraud Indicators:                                                │ │
│  │  • Duplicate Pattern: 4 claims in last 7 days (Score: 0.30)         │ │
│  │  • Behavioral Anomaly: ML model flagged unusual pattern (0.48)      │ │
│  │                                                                      │ │
│  │  Claim History: [View Timeline] • ML Analysis: [View Report]        │ │
│  │                                                                      │ │
│  │  [Approve] [Reject] [Request More Info] [View Full Analysis]        │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│  ⚠️ MEDIUM PRIORITY ALERTS (7)                                             │
│  [Expand to view...]                                                       │
│                                                                            │
│  ✓ LOW PRIORITY ALERTS (12)                                                │
│  [Expand to view...]                                                       │
│                                                                            │
│  ✅ RESOLVED TODAY (23)                                                    │
│  [View resolved alerts...]                                                 │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 5.4 Analytics Dashboard

```
┌────────────────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                    Analytics & Insights               │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Date Range: [Last 30 Days ▼]    Compare: [Previous Period]    [Export]   │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │  Financial Metrics                                                   │ │
│  ├──────────────────────────────────────────────────────────────────────┤ │
│  │  Total Premiums Collected        ₹2,84,700    ↑ 15%                 │ │
│  │  Total Claims Paid               ₹1,95,200    ↑ 23%                 │ │
│  │  Net Revenue                     ₹89,500      ↑ 3%                  │ │
│  │  Loss Ratio                      68.5%         ↓ 2.1%                │ │
│  │  Average Premium per Policy      ₹100          →                     │ │
│  │  Average Claim Amount            ₹625          ↑ 8%                  │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│  ┌─────────────────────────────────────┬──────────────────────────────┐  │
│  │  Premium Collection Trend           │  Claims by Disruption Type   │  │
│  │                                     │                              │  │
│  │  [Line Chart]                       │  [Pie Chart]                 │  │
│  │  ₹                                  │                              │  │
│  │  300k│                              │  🌧️ Heavy Rain: 45%          │  │
│  │     │        ╱─╲                    │  🔥 Extreme Heat: 28%        │  │
│  │  200k│      ╱   ╲    ╱─╲            │  💨 High AQI: 18%            │  │
│  │     │    ╱       ╲  ╱   ╲           │  🚫 Zone Closure: 9%         │  │
│  │  100k│  ╱           ╲╱               │                              │  │
│  │     └─────────────────────          │                              │  │
│  │      Week 9  10  11  12             │                              │  │
│  └─────────────────────────────────────┴──────────────────────────────┘  │
│                                                                            │
│  ┌─────────────────────────────────────┬──────────────────────────────┐  │
│  │  Top 5 High-Risk Zones              │  Fraud Detection Stats       │  │
│  │                                     │                              │  │
│  │  1. Andheri West    156 claims     │  Total Claims: 312           │  │
│  │  2. Thane           89 claims      │  Auto-Approved: 289 (92.6%)  │  │
│  │  3. Bandra          67 claims      │  Flagged: 18 (5.8%)          │  │
│  │  4. Dadar           45 claims      │  Rejected: 5 (1.6%)          │  │
│  │  5. Kurla           34 claims      │                              │  │
│  │                                     │  Fraud Detection Accuracy:   │  │
│  │  [View Full Report]                 │  95.2% (validated)           │  │
│  └─────────────────────────────────────┴──────────────────────────────┘  │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │  User Engagement Metrics                                             │ │
│  ├──────────────────────────────────────────────────────────────────────┤ │
│  │  Active Users                2,847    ↑ 12%                          │ │
│  │  New Registrations (30d)     342      ↑ 18%                          │ │
│  │  Policy Renewal Rate         87.3%    ↑ 3.2%                         │ │
│  │  Average Policy Duration     8.2 weeks                               │ │
│  │  Churn Rate                  4.5%     ↓ 1.2%                         │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │  Predictive Insights (ML-Powered)                                    │ │
│  ├──────────────────────────────────────────────────────────────────────┤ │
│  │  📊 Next Week Forecast (Week 13)                                     │ │
│  │  • Expected Claims: 145-165 (based on weather forecast)              │ │
│  │  • Estimated Payout: ₹90,000 - ₹1,05,000                             │ │
│  │  • High-Risk Zones: Andheri West, Thane (monsoon approaching)       │ │
│  │                                                                      │ │
│  │  💡 Recommendations:                                                 │ │
│  │  • Increase premium by 5% in high-risk zones                         │ │
│  │  • Send proactive alerts to 234 users in flood-prone areas          │ │
│  │  • Prepare for 20% increase in claim volume                          │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 5.5 Policy Management Screen

```
┌────────────────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                    Policy Management                  │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Filters: [Active] [Expired] [Claimed Out]    Search: [_________] 🔍      │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │  Policy  User          Platform  Zone        Premium  Coverage Status│ │
│  ├──────────────────────────────────────────────────────────────────────┤ │
│  │  POL-123 Rajesh Kumar  Zomato    Andheri W.  ₹100     ₹2,000  Active│ │
│  │  POL-124 Amit Patel    Swiggy    Bandra      ₹95      ₹2,000  Active│ │
│  │  POL-125 Priya Sharma  Zomato    Powai       ₹85      ₹2,000  Active│ │
│  │  POL-126 Suresh Reddy  Swiggy    Thane       ₹110     ₹2,000  Active│ │
│  │  POL-127 Neha Gupta    Zomato    Dadar       ₹90      ₹2,000  Active│ │
│  │  ...                                                                 │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│  Showing 1-50 of 2,847 policies    [Previous] [1] [2] [3] ... [57] [Next] │
│                                                                            │
│  [Export to CSV] [Bulk Actions ▼]                                         │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. COMPONENT SPECIFICATIONS

### 6.1 Key UI Components

**Mobile Components:**
- `<OTPInput />` - 4-digit OTP entry with auto-focus
- `<PolicyCard />` - Weekly coverage status with progress bar
- `<WeatherAlert />` - Real-time disruption notifications
- `<ClaimTimeline />` - Auto-claim processing status
- `<WalletBalance />` - Current balance with withdraw CTA
- `<PremiumBreakdown />` - Transparent pricing explanation
- `<ZoneSelector />` - Multi-zone selection with map
- `<TriggerStatus />` - Live parametric trigger monitoring

**Desktop Components:**
- `<RiskHeatMap />` - Mapbox GL with real-time overlays
- `<FraudAlertCard />` - Detailed fraud analysis with actions
- `<PayoutLogTable />` - Real-time payout processing log
- `<AnalyticsChart />` - Recharts for financial metrics
- `<PredictiveInsights />` - ML-powered forecasts
- `<BulkActionPanel />` - Admin bulk operations

### 6.2 Design System

**Colors:**
- Primary: `#667eea` (Purple-blue gradient)
- Success: `#10b981` (Green - approved claims)
- Warning: `#f59e0b` (Amber - medium risk)
- Danger: `#ef4444` (Red - high risk/fraud)
- Neutral: `#6b7280` (Gray - text)

**Typography:**
- Headings: Inter Bold
- Body: Inter Regular
- Numbers: JetBrains Mono (monospace for amounts)

**Spacing:**
- Base unit: 4px
- Card padding: 20px
- Section gap: 24px

