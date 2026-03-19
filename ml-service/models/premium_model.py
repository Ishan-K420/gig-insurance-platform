import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
import joblib

class PremiumCalculator:
    def __init__(self):
        self.model = None
        self.base_premium = 80
        
    def train_model(self, X_train, y_train):
        """Train premium calculation model"""
        self.model = GradientBoostingRegressor(
            n_estimators=100,
            learning_rate=0.1,
            max_depth=3,
            random_state=42
        )
        self.model.fit(X_train, y_train)
        
    def calculate_premium(self, features):
        """
        Calculate weekly premium based on features
        
        Features:
        - location_risk_score (0-100)
        - avg_weekly_hours (20-80)
        - historical_claims (0-10)
        - season_factor (0.8-1.3)
        - weather_volatility (0-100)
        """
        if self.model:
            premium = self.model.predict([features])[0]
        else:
            # Fallback rule-based calculation
            location_risk = features[0]
            weekly_hours = features[1]
            historical_claims = features[2]
            season_factor = features[3]
            
            premium = self.base_premium
            premium += (location_risk / 100) * 40  # Max +40 for high risk
            premium += (weekly_hours - 40) * 0.5   # +0.5 per extra hour
            premium -= min(historical_claims * 2, 20)  # Discount for claim-free
            premium *= season_factor
            
        return max(50, min(150, premium))  # Clamp between 50-150

    def save_model(self, path='models/premium_model.pkl'):
        if self.model:
            joblib.dump(self.model, path)
    
    def load_model(self, path='models/premium_model.pkl'):
        self.model = joblib.load(path)


class FraudDetector:
    def __init__(self):
        self.threshold = 0.7
        
    def detect_fraud(self, claim_data):
        """
        Detect fraudulent claims
        
        Returns: (fraud_score, is_fraudulent, indicators)
        """
        indicators = []
        score = 0.0
        
        # Check 1: Location mismatch
        if self._check_location_mismatch(claim_data):
            score += 0.3
            indicators.append("location_mismatch")
        
        # Check 2: Timing anomaly
        if self._check_timing_anomaly(claim_data):
            score += 0.25
            indicators.append("timing_anomaly")
        
        # Check 3: Duplicate pattern
        if self._check_duplicate_pattern(claim_data):
            score += 0.35
            indicators.append("duplicate_pattern")
        
        # Check 4: Platform activity conflict
        if self._check_platform_conflict(claim_data):
            score += 0.4
            indicators.append("platform_active_during_claim")
        
        is_fraudulent = score >= self.threshold
        
        return score, is_fraudulent, indicators
    
    def _check_location_mismatch(self, claim_data):
        """Check if claim location is far from weather event"""
        claim_lat = claim_data.get('latitude')
        claim_lon = claim_data.get('longitude')
        event_lat = claim_data.get('event_latitude')
        event_lon = claim_data.get('event_longitude')
        
        if all([claim_lat, claim_lon, event_lat, event_lon]):
            distance = self._haversine_distance(
                claim_lat, claim_lon, event_lat, event_lon
            )
            return distance > 5  # More than 5km away
        return False
    
    def _check_timing_anomaly(self, claim_data):
        """Check if claim submitted too late"""
        from datetime import datetime, timedelta
        
        event_time = claim_data.get('event_timestamp')
        claim_time = claim_data.get('claim_timestamp')
        
        if event_time and claim_time:
            if isinstance(event_time, str):
                event_time = datetime.fromisoformat(event_time)
            if isinstance(claim_time, str):
                claim_time = datetime.fromisoformat(claim_time)
            
            time_diff = claim_time - event_time
            return time_diff > timedelta(hours=24)
        return False
    
    def _check_duplicate_pattern(self, claim_data):
        """Check for suspicious claim patterns"""
        recent_claims = claim_data.get('recent_claims_count', 0)
        return recent_claims > 3  # More than 3 claims in 2 weeks
    
    def _check_platform_conflict(self, claim_data):
        """Check if worker was active on platform during claimed disruption"""
        was_active = claim_data.get('platform_active', False)
        return was_active
    
    def _haversine_distance(self, lat1, lon1, lat2, lon2):
        """Calculate distance between two coordinates in km"""
        R = 6371  # Earth radius in km
        
        lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        
        a = np.sin(dlat/2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2)**2
        c = 2 * np.arcsin(np.sqrt(a))
        
        return R * c


if __name__ == "__main__":
    # Test premium calculator
    calc = PremiumCalculator()
    
    # Example: High risk location, 60 hours/week, no claims, monsoon season
    features = [75, 60, 0, 1.25, 80]
    premium = calc.calculate_premium(features)
    print(f"Calculated Weekly Premium: ₹{premium:.2f}")
    
    # Test fraud detector
    detector = FraudDetector()
    
    test_claim = {
        'latitude': 19.0760,
        'longitude': 72.8777,
        'event_latitude': 19.0760,
        'event_longitude': 72.8777,
        'event_timestamp': '2026-03-19T10:00:00',
        'claim_timestamp': '2026-03-19T11:00:00',
        'recent_claims_count': 1,
        'platform_active': False
    }
    
    score, is_fraud, indicators = detector.detect_fraud(test_claim)
    print(f"\nFraud Score: {score:.2f}")
    print(f"Is Fraudulent: {is_fraud}")
    print(f"Indicators: {indicators}")
