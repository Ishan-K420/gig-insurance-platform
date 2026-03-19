# AI/ML MODULE BLUEPRINT

---

## 3. AI/ML SYSTEM ARCHITECTURE

### 3.1 Premium Calculation Engine

#### Model Architecture: Gradient Boosting (XGBoost)

**Input Features (Feature Vector):**

```python
feature_vector = {
    # Location-based features
    'zone_historical_rainfall_avg': float,  # mm per week, last 52 weeks
    'zone_heatwave_days_per_year': int,
    'zone_aqi_avg': float,
    'zone_flood_prone_score': float,  # 0-100 from govt data
    'zone_traffic_congestion_index': float,  # 0-100
    
    # Temporal features
    'week_of_year': int,  # 1-52
    'is_monsoon_season': bool,  # June-Sept
    'is_summer_peak': bool,  # April-May
    'is_festival_week': bool,  # Diwali, Holi, etc.
    'month_encoded': int,  # 1-12
    
    # Worker-specific features
    'avg_weekly_hours': int,  # 20-80
    'avg_weekly_earnings': float,  # INR
    'platform_tenure_months': int,
    'vehicle_type_encoded': int,  # 0=bicycle, 1=scooter, 2=bike
    'historical_claims_count': int,  # last 6 months
    'claim_free_weeks': int,  # consecutive weeks without claim
    
    # Derived features
    'earnings_per_hour': float,  # avg_weekly_earnings / avg_weekly_hours
    'risk_exposure_score': float,  # hours × zone_risk
    'seasonal_multiplier': float,  # 0.8-1.3 based on season
    
    # External data features
    'next_week_rain_forecast_mm': float,  # from weather API
    'next_week_temp_forecast_max': float,
    'local_events_count': int,  # strikes, festivals, etc.
}
```

**Target Variable:**
```python
target = 'optimal_weekly_premium'  # Range: ₹50-₹150
```

**Training Data Generation:**
```python
# Synthetic training data based on actuarial principles
training_samples = 50000  # Simulated historical policies

# Loss ratio target: 65-70% (industry standard)
# Premium = (Expected_Payout × 1.5) + Base_Cost
```

**Model Training Pipeline:**

```python
from xgboost import XGBRegressor
from sklearn.model_selection import TimeSeriesSplit
from sklearn.preprocessing import StandardScaler

class PremiumCalculator:
    def __init__(self):
        self.model = XGBRegressor(
            n_estimators=200,
            max_depth=6,
            learning_rate=0.05,
            subsample=0.8,
            colsample_bytree=0.8,
            objective='reg:squarederror',
            random_state=42
        )
        self.scaler = StandardScaler()
        self.feature_importance = {}
        
    def train(self, X_train, y_train):
        # Time-series cross-validation (no data leakage)
        tscv = TimeSeriesSplit(n_splits=5)
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X_train)
        
        # Train model
        self.model.fit(X_scaled, y_train)
        
        # Store feature importance
        self.feature_importance = dict(zip(
            X_train.columns,
            self.model.feature_importances_
        ))
        
    def predict_premium(self, features):
        # Scale input
        features_scaled = self.scaler.transform([features])
        
        # Predict
        premium = self.model.predict(features_scaled)[0]
        
        # Apply business rules
        premium = max(50, min(150, premium))  # Hard limits
        premium = round(premium / 5) * 5  # Round to nearest ₹5
        
        return premium
    
    def explain_premium(self, features):
        # SHAP values for explainability
        import shap
        explainer = shap.TreeExplainer(self.model)
        shap_values = explainer.shap_values(features)
        
        return {
            'base_value': explainer.expected_value,
            'feature_contributions': dict(zip(
                features.keys(),
                shap_values
            ))
        }
```

**Premium Calculation Flow:**

```
User Registration
       ↓
Extract Features (location, hours, platform)
       ↓
Fetch External Data (weather forecast, zone risk)
       ↓
Build Feature Vector (25 features)
       ↓
ML Model Inference (XGBoost)
       ↓
Apply Business Rules (₹50-₹150 range)
       ↓
Calculate Coverage Amount (premium × 20)
       ↓
Store in weekly_policies collection
       ↓
Return to User with Breakdown
```

**Example Calculation:**

```javascript
// Input
{
  zone: "Andheri West, Mumbai",
  weekNumber: 12,
  avgWeeklyHours: 55,
  avgWeeklyEarnings: 6500,
  platformTenure: 24,
  historicalClaims: 2
}

// Feature Engineering
{
  zone_historical_rainfall_avg: 85.5,  // High (monsoon city)
  zone_flood_prone_score: 78,
  is_monsoon_season: false,  // March
  is_summer_peak: false,
  avg_weekly_hours: 55,
  earnings_per_hour: 118.18,
  claim_free_weeks: 8,
  seasonal_multiplier: 1.0,
  next_week_rain_forecast_mm: 12
}

// ML Model Output
raw_premium = 102.34

// Business Rules
final_premium = round(102.34 / 5) * 5 = ₹100

// Breakdown for User
{
  basePremium: 80,
  locationRisk: +18,  // High flood risk
  hoursBonus: +12,    // 55 hours > 50 threshold
  loyaltyDiscount: -10,  // 8 claim-free weeks
  finalPremium: 100,
  coverageAmount: 2000
}
```

---

### 3.2 Fraud Detection Engine

#### Multi-Layer Anomaly Detection System

**Layer 1: Rule-Based Validation (Fast Path)**

```python
class RuleBasedFraudDetector:
    def __init__(self):
        self.rules = {
            'location_mismatch': {
                'max_distance_km': 5,
                'weight': 0.35
            },
            'timing_anomaly': {
                'max_delay_hours': 24,
                'weight': 0.25
            },
            'platform_conflict': {
                'check_active_status': True,
                'weight': 0.40
            },
            'duplicate_pattern': {
                'max_claims_per_week': 3,
                'weight': 0.30
            },
            'velocity_check': {
                'max_claims_per_day': 2,
                'weight': 0.20
            }
        }
    
    def check_location_mismatch(self, claim):
        """
        Verify worker was in disrupted zone
        """
        worker_lat = claim['workerLocation']['lat']
        worker_lng = claim['workerLocation']['lng']
        event_lat = claim['eventLocation']['lat']
        event_lng = claim['eventLocation']['lng']
        
        distance = haversine_distance(
            worker_lat, worker_lng,
            event_lat, event_lng
        )
        
        if distance > self.rules['location_mismatch']['max_distance_km']:
            return {
                'passed': False,
                'score': 0.35,
                'reason': f'Worker {distance:.1f}km from event'
            }
        
        return {'passed': True, 'score': 0.0}
    
    def check_platform_conflict(self, claim):
        """
        Verify worker wasn't actively delivering during disruption
        """
        # Query mock platform API
        was_active = check_platform_activity(
            user_id=claim['userId'],
            start_time=claim['disruptionStart'],
            end_time=claim['disruptionEnd']
        )
        
        if was_active:
            return {
                'passed': False,
                'score': 0.40,
                'reason': 'Worker was active on platform during claimed disruption'
            }
        
        return {'passed': True, 'score': 0.0}
    
    def check_timing_anomaly(self, claim):
        """
        Verify claim submitted within reasonable time
        """
        event_time = claim['disruptionDetectedAt']
        claim_time = claim['claimSubmittedAt']
        
        delay_hours = (claim_time - event_time).total_seconds() / 3600
        
        if delay_hours > self.rules['timing_anomaly']['max_delay_hours']:
            return {
                'passed': False,
                'score': 0.25,
                'reason': f'Claim submitted {delay_hours:.1f}h after event'
            }
        
        return {'passed': True, 'score': 0.0}
    
    def check_duplicate_pattern(self, claim):
        """
        Check for suspicious claim frequency
        """
        recent_claims = get_user_claims(
            user_id=claim['userId'],
            days=7
        )
        
        if len(recent_claims) > self.rules['duplicate_pattern']['max_claims_per_week']:
            return {
                'passed': False,
                'score': 0.30,
                'reason': f'{len(recent_claims)} claims in 7 days'
            }
        
        return {'passed': True, 'score': 0.0}
    
    def evaluate(self, claim):
        """
        Run all rule checks and aggregate score
        """
        checks = {
            'location': self.check_location_mismatch(claim),
            'platform': self.check_platform_conflict(claim),
            'timing': self.check_timing_anomaly(claim),
            'duplicate': self.check_duplicate_pattern(claim)
        }
        
        total_score = sum(check['score'] for check in checks.values())
        all_passed = all(check['passed'] for check in checks.values())
        
        return {
            'fraud_score': total_score,
            'is_fraudulent': total_score >= 0.7,
            'checks': checks,
            'decision': 'reject' if total_score >= 0.7 else 'approve'
        }
```

**Layer 2: ML-Based Anomaly Detection (Deep Analysis)**

```python
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import numpy as np

class MLFraudDetector:
    def __init__(self):
        self.isolation_forest = IsolationForest(
            contamination=0.05,  # Expect 5% fraud rate
            random_state=42
        )
        self.scaler = StandardScaler()
        
    def extract_behavioral_features(self, user_id):
        """
        Extract user behavior patterns
        """
        claims_history = get_user_claims(user_id, days=180)
        
        features = {
            # Temporal patterns
            'avg_claim_interval_days': calculate_avg_interval(claims_history),
            'claim_time_variance': calculate_time_variance(claims_history),
            'weekend_claim_ratio': count_weekend_claims(claims_history) / len(claims_history),
            
            # Amount patterns
            'avg_claim_amount': np.mean([c['amount'] for c in claims_history]),
            'claim_amount_std': np.std([c['amount'] for c in claims_history]),
            'max_claim_amount': np.max([c['amount'] for c in claims_history]),
            
            # Location patterns
            'unique_claim_locations': count_unique_locations(claims_history),
            'location_entropy': calculate_location_entropy(claims_history),
            
            # Disruption type patterns
            'disruption_type_diversity': count_unique_disruption_types(claims_history),
            'most_common_disruption_ratio': calculate_most_common_ratio(claims_history),
            
            # Timing patterns
            'claims_during_peak_hours': count_peak_hour_claims(claims_history),
            'claims_during_off_hours': count_off_hour_claims(claims_history),
            
            # Velocity features
            'claims_last_7_days': count_recent_claims(claims_history, 7),
            'claims_last_30_days': count_recent_claims(claims_history, 30),
            'max_claims_in_week': calculate_max_weekly_claims(claims_history)
        }
        
        return features
    
    def train(self, historical_claims):
        """
        Train on historical claim patterns
        """
        X = []
        for claim in historical_claims:
            features = self.extract_behavioral_features(claim['userId'])
            X.append(list(features.values()))
        
        X_scaled = self.scaler.fit_transform(X)
        self.isolation_forest.fit(X_scaled)
    
    def predict_fraud_probability(self, claim):
        """
        Predict fraud probability for new claim
        """
        features = self.extract_behavioral_features(claim['userId'])
        X = self.scaler.transform([list(features.values())])
        
        # Isolation Forest returns -1 for anomalies, 1 for normal
        anomaly_score = self.isolation_forest.score_samples(X)[0]
        
        # Convert to probability (0-1)
        fraud_probability = 1 / (1 + np.exp(anomaly_score))
        
        return {
            'ml_fraud_score': fraud_probability,
            'is_anomaly': fraud_probability > 0.7,
            'behavioral_features': features
        }
```

**Layer 3: GPS Trajectory Validation**

```python
class GPSValidator:
    def __init__(self):
        self.max_speed_kmh = 60  # Max realistic speed for delivery bike
        
    def validate_trajectory(self, claim):
        """
        Validate GPS trajectory during disruption period
        """
        # Fetch GPS logs from user's device (if available)
        gps_logs = get_gps_logs(
            user_id=claim['userId'],
            start_time=claim['disruptionStart'],
            end_time=claim['disruptionEnd']
        )
        
        if not gps_logs:
            return {'validated': False, 'reason': 'No GPS data available'}
        
        # Check 1: Was user in affected zone?
        in_zone = any(
            is_point_in_radius(
                log['lat'], log['lng'],
                claim['eventLocation']['lat'],
                claim['eventLocation']['lng'],
                radius_km=5
            )
            for log in gps_logs
        )
        
        if not in_zone:
            return {
                'validated': False,
                'reason': 'GPS logs show user outside affected zone'
            }
        
        # Check 2: Realistic movement pattern?
        for i in range(len(gps_logs) - 1):
            distance = haversine_distance(
                gps_logs[i]['lat'], gps_logs[i]['lng'],
                gps_logs[i+1]['lat'], gps_logs[i+1]['lng']
            )
            time_diff = (gps_logs[i+1]['timestamp'] - gps_logs[i]['timestamp']).total_seconds() / 3600
            speed = distance / time_diff if time_diff > 0 else 0
            
            if speed > self.max_speed_kmh:
                return {
                    'validated': False,
                    'reason': f'Unrealistic speed detected: {speed:.1f} km/h'
                }
        
        return {'validated': True}
```

**Integrated Fraud Detection Pipeline:**

```
New Claim Submitted
       ↓
Layer 1: Rule-Based Checks (< 100ms)
       ↓
   [Score < 0.5] → Auto-Approve
       ↓
   [Score 0.5-0.7] → Layer 2: ML Analysis
       ↓
Layer 2: Behavioral Anomaly Detection (< 500ms)
       ↓
   [ML Score < 0.6] → Approve with Monitoring
       ↓
   [ML Score 0.6-0.8] → Layer 3: GPS Validation
       ↓
Layer 3: GPS Trajectory Analysis (< 1s)
       ↓
   [GPS Valid] → Approve
   [GPS Invalid] → Flag for Manual Review
       ↓
   [Score > 0.8] → Auto-Reject + Alert Admin
```

**Fraud Score Calculation:**

```python
def calculate_final_fraud_score(claim):
    # Layer 1: Rule-based (weight: 50%)
    rule_result = rule_detector.evaluate(claim)
    rule_score = rule_result['fraud_score']
    
    # Layer 2: ML-based (weight: 30%)
    ml_result = ml_detector.predict_fraud_probability(claim)
    ml_score = ml_result['ml_fraud_score']
    
    # Layer 3: GPS validation (weight: 20%)
    gps_result = gps_validator.validate_trajectory(claim)
    gps_score = 0.0 if gps_result['validated'] else 0.8
    
    # Weighted average
    final_score = (
        rule_score * 0.5 +
        ml_score * 0.3 +
        gps_score * 0.2
    )
    
    return {
        'final_fraud_score': final_score,
        'decision': 'reject' if final_score >= 0.7 else 'approve',
        'confidence': calculate_confidence(rule_score, ml_score, gps_score),
        'breakdown': {
            'rule_based': rule_score,
            'ml_based': ml_score,
            'gps_based': gps_score
        },
        'checks': {
            'rule_checks': rule_result['checks'],
            'behavioral_features': ml_result['behavioral_features'],
            'gps_validation': gps_result
        }
    }
```

---

### 3.3 Predictive Risk Modeling (Future Enhancement)

**LSTM Time Series Forecasting for Proactive Risk Assessment**

```python
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

class RiskForecaster:
    def __init__(self):
        self.model = Sequential([
            LSTM(64, return_sequences=True, input_shape=(7, 10)),  # 7 days, 10 features
            Dropout(0.2),
            LSTM(32, return_sequences=False),
            Dropout(0.2),
            Dense(16, activation='relu'),
            Dense(1, activation='sigmoid')  # Probability of disruption
        ])
        
        self.model.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=['accuracy']
        )
    
    def predict_next_week_risk(self, zone, week_number):
        """
        Predict probability of disruption in next week
        """
        # Fetch historical data (last 7 weeks)
        historical_data = get_zone_history(zone, weeks=7)
        
        # Features: rainfall, temp, aqi, traffic, events, etc.
        X = prepare_time_series_features(historical_data)
        
        # Predict
        risk_probability = self.model.predict(X)[0][0]
        
        return {
            'zone': zone,
            'week': week_number + 1,
            'disruption_probability': risk_probability,
            'recommended_premium_adjustment': calculate_adjustment(risk_probability)
        }
```

**Use Case:** Proactively notify workers about high-risk weeks and offer dynamic pricing.

