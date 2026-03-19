# Setup Instructions for Windows

## Current Situation
The project files are located at: `/home/ishan/gig-insurance-platform/`

You need to either:
1. Access them via WSL (Windows Subsystem for Linux), OR
2. Copy them to your Windows directory

## Option 1: Using WSL (Recommended)

Open WSL terminal and run:
```bash
cd /home/ishan/gig-insurance-platform

# Terminal 1 - ML Service
cd ml-service
pip install -r requirements.txt
python app.py

# Terminal 2 - Backend (open new WSL terminal)
cd /home/ishan/gig-insurance-platform/backend
npm install
npm start

# Terminal 3 - Frontend (open new WSL terminal)
cd /home/ishan/gig-insurance-platform/frontend
npm install
npm start
```

## Option 2: Copy to Windows

From WSL, copy to Windows:
```bash
cp -r /home/ishan/gig-insurance-platform /mnt/c/Users/Lenovo/
```

Then from Windows Command Prompt:
```cmd
cd C:\Users\Lenovo\gig-insurance-platform
start-windows.bat
```

## Quick Access Path

If using WSL, the Windows path is:
```
\\wsl$\Ubuntu\home\ishan\gig-insurance-platform
```

You can access this in Windows Explorer.

## Verify Project Location

Run this in WSL:
```bash
ls -la /home/ishan/gig-insurance-platform
```

You should see:
- README.md
- backend/
- frontend/
- ml-service/
- docs/
