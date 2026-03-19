# Database Schema Design

## Tables

### 1. users
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    delivery_platform VARCHAR(50) NOT NULL, -- 'zomato', 'swiggy'
    city VARCHAR(50) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    avg_weekly_hours INTEGER,
    avg_weekly_earnings DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);
```

### 2. policies
```sql
CREATE TABLE policies (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    week_start_date DATE NOT NULL,
    week_end_date DATE NOT NULL,
    weekly_premium DECIMAL(10, 2) NOT NULL,
    coverage_amount DECIMAL(10, 2) NOT NULL,
    risk_score DECIMAL(5, 2),
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'expired', 'claimed'
    payment_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. claims
```sql
CREATE TABLE claims (
    id SERIAL PRIMARY KEY,
    policy_id INTEGER REFERENCES policies(id),
    user_id INTEGER REFERENCES users(id),
    trigger_type VARCHAR(50) NOT NULL, -- 'heavy_rain', 'extreme_heat', 'high_aqi'
    trigger_value DECIMAL(10, 2), -- rainfall in mm, temp in C, AQI value
    hours_lost INTEGER,
    claim_amount DECIMAL(10, 2),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'paid'
    fraud_score DECIMAL(5, 2),
    triggered_at TIMESTAMP,
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. weather_events
```sql
CREATE TABLE weather_events (
    id SERIAL PRIMARY KEY,
    city VARCHAR(50) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    event_type VARCHAR(50), -- 'rain', 'heat', 'pollution'
    value DECIMAL(10, 2),
    timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. fraud_logs
```sql
CREATE TABLE fraud_logs (
    id SERIAL PRIMARY KEY,
    claim_id INTEGER REFERENCES claims(id),
    fraud_indicators JSONB, -- Store multiple fraud signals
    fraud_score DECIMAL(5, 2),
    is_fraudulent BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Indexes
```sql
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_policies_user_week ON policies(user_id, week_start_date);
CREATE INDEX idx_claims_policy ON claims(policy_id);
CREATE INDEX idx_weather_city_time ON weather_events(city, timestamp);
```
