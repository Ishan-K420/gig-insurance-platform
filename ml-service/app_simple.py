from http.server import HTTPServer, BaseHTTPRequestHandler
import json

class SimpleMLAPI(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "healthy"}).encode())
    
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = json.loads(self.rfile.read(content_length))
        
        if self.path == '/calculate-premium':
            # Simple rule-based premium calculation
            location_risk = body.get('location_risk_score', 50)
            weekly_hours = body.get('avg_weekly_hours', 40)
            
            premium = 80 + (location_risk / 100 * 40) + (weekly_hours - 40) * 0.5
            premium = max(50, min(150, premium))
            
            response = {
                "weekly_premium": round(premium, 2),
                "breakdown": {
                    "base_premium": 80,
                    "location_adjustment": round((location_risk / 100) * 40, 2),
                    "hours_adjustment": round((weekly_hours - 40) * 0.5, 2)
                }
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
        
        elif self.path == '/detect-fraud':
            # Simple fraud detection
            score = 0.2  # Low fraud score for demo
            response = {
                "fraud_score": score,
                "is_fraudulent": False,
                "indicators": []
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

if __name__ == '__main__':
    server = HTTPServer(('localhost', 8000), SimpleMLAPI)
    print('ML Service running on http://localhost:8000')
    print('No dependencies required - using built-in Python only')
    server.serve_forever()
