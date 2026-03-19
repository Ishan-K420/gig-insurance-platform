from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import sys
sys.path.append('models')
from premium_model import PremiumCalculator, FraudDetector

app = FastAPI(title="Gig Insurance ML Service")

premium_calc = PremiumCalculator()
fraud_detector = FraudDetector()

class PremiumRequest(BaseModel):
    location_risk_score: float
    avg_weekly_hours: int
    historical_claims: int
    season_factor: float
    weather_volatility: float

class PremiumResponse(BaseModel):
    weekly_premium: float
    breakdown: dict

class ClaimFraudRequest(BaseModel):
    latitude: float
    longitude: float
    event_latitude: float
    event_longitude: float
    event_timestamp: str
    claim_timestamp: str
    recent_claims_count: int
    platform_active: bool

class FraudResponse(BaseModel):
    fraud_score: float
    is_fraudulent: bool
    indicators: List[str]

@app.get("/")
def root():
    return {"service": "Gig Insurance ML API", "status": "active"}

@app.post("/calculate-premium", response_model=PremiumResponse)
def calculate_premium(request: PremiumRequest):
    features = [
        request.location_risk_score,
        request.avg_weekly_hours,
        request.historical_claims,
        request.season_factor,
        request.weather_volatility
    ]
    
    premium = premium_calc.calculate_premium(features)
    
    breakdown = {
        "base_premium": 80,
        "location_adjustment": round((request.location_risk_score / 100) * 40, 2),
        "hours_adjustment": round((request.avg_weekly_hours - 40) * 0.5, 2),
        "claims_discount": -min(request.historical_claims * 2, 20),
        "seasonal_multiplier": request.season_factor
    }
    
    return {
        "weekly_premium": round(premium, 2),
        "breakdown": breakdown
    }

@app.post("/detect-fraud", response_model=FraudResponse)
def detect_fraud(request: ClaimFraudRequest):
    claim_data = request.dict()
    
    score, is_fraudulent, indicators = fraud_detector.detect_fraud(claim_data)
    
    return {
        "fraud_score": round(score, 2),
        "is_fraudulent": is_fraudulent,
        "indicators": indicators
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
