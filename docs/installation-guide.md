# Complete Installation & Setup Guide

## System Requirements Check

Before proceeding, verify you have all required tools installed:

```powershell
# Check Node.js version (need 18+)
node --version

# Check npm version (need 9+)
npm --version

# Check Docker
docker --version

# Check Docker Compose
docker-compose --version

# Check Flutter (if installed)
flutter --version

# Check Git (optional but recommended)
git --version
```

## Installation Steps

### 1. Install Node.js & npm

**Windows:**

Option A - Using Installer (Recommended):
1. Visit [nodejs.org](https://nodejs.org)
2. Download LTS version (18.x or 20.x)
3. Run installer and follow setup wizard
4. Verify installation:
```powershell
node --version
npm --version
```

Option B - Using Chocolatey:
```powershell
choco install nodejs
```

### 2. Install Docker & Docker Compose

**Windows:**

1. Install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
2. During installation, enable **WSL 2** (Windows Subsystem for Linux 2)
3. Restart computer when prompted
4. Verify installation:
```powershell
docker --version
docker-compose --version
```

### 3. Install PostgreSQL (Optional - Docker provides it)

**If using Docker Compose** (Recommended):
- PostgreSQL is included in `docker-compose.yml`
- No separate installation needed

**If installing locally:**

Option A - Installer:
1. Visit [postgresql.org](https://www.postgresql.org/download/)
2. Download Windows installer
3. Follow installation wizard
4. Remember the password you set for `postgres` user

Option B - Chocolatey:
```powershell
choco install postgresql
```

### 4. Install Flutter

**Windows Setup:**

#### Step 1: Download Flutter SDK

1. Visit [flutter.dev/docs/get-started/install/windows](https://flutter.dev/docs/get-started/install/windows)
2. Download Flutter SDK
3. Extract to a location without spaces (e.g., `C:\flutter`)

```powershell
# Example with Git
git clone https://github.com/flutter/flutter.git -b stable
# Then move to C:\flutter
```

#### Step 2: Add Flutter to PATH

1. Open **Environment Variables**:
   - Press `Win + X` → Select "System"
   - Click "Advanced system settings"
   - Click "Environment Variables"

2. Under "User variables", click "New"
   - Variable name: `PATH`
   - Variable value: `C:\flutter\bin` (or your Flutter path)

3. Click OK and restart PowerShell

#### Step 3: Verify Flutter Installation

```powershell
flutter --version

# Should show something like:
# Flutter 3.13.0 • channel stable • https://github.com/flutter/flutter.git
```

#### Step 4: Run Flutter Doctor

```powershell
flutter doctor

# This shows what's missing and what's installed
```

#### Step 5: Install Android Studio (for Android development)

Option A - Full Android Studio:
1. Visit [developer.android.com/studio](https://developer.android.com/studio)
2. Download and install Android Studio
3. During setup, install SDK, tools, and emulator
4. Run `flutter doctor` again

Option B - Command Line Only:
```powershell
flutter config --android-sdk "C:\Android\sdk"
```

#### Step 6: Accept Android Licenses

```powershell
flutter doctor --android-licenses

# Type 'y' for each license agreement
```

## Project Setup

Once all tools are installed, set up the project:

### 1. Navigate to Project

```powershell
cd "C:\Users\Admin\Documents\idea-generator-app"
```

### 2. Install Backend Dependencies

```powershell
cd backend-api
npm install --legacy-peer-deps
```

Expected output:
```
added 789 packages, and audited 790 packages in 3m
```

### 3. Install Flutter Dependencies

```powershell
cd ..\mobile-app
flutter pub get
```

Expected output:
```
Running pubspec.yaml...
Running packages get...
✓ Got dependencies in 30.2s.
```

### 4. Verify All Systems

```powershell
# Check Docker services
docker-compose ps

# Check backend ready
cd ..\backend-api
npm run build

# Check Flutter ready
cd ..\mobile-app
flutter doctor
```

## Starting the Application

### Terminal 1: Database Services

```powershell
cd idea-generator-app
docker-compose up -d

# Verify
docker-compose ps
```

### Terminal 2: Backend API

```powershell
cd idea-generator-app\backend-api
npm run start:dev

# Expected:
# [Nest] 12345  - LOG [NestApplication] Nest application successfully started
# ✅ Server running on http://localhost:3000
```

### Terminal 3: Mobile App (choose one)

**Option A - Android Emulator:**
```powershell
cd idea-generator-app\mobile-app
flutter run

# Select available device when prompted
```

**Option B - iOS Simulator (macOS only):**
```powershell
cd idea-generator-app\mobile-app
flutter run -d macos
```

## Troubleshooting Installation

### "flutter: command not found"

**Solution:**
1. Check if Flutter was added to PATH:
```powershell
$env:PATH
```

2. If not present, add manually:
```powershell
# Temporarily (current session only)
$env:PATH += ";C:\flutter\bin"

# Permanently edit Environment Variables (see Step 2 above)
```

### "Cannot find module 'dotenv'"

**Solution:**
```powershell
cd backend-api
npm install dotenv
npm install --legacy-peer-deps
```

### "Docker daemon not running"

**Solution:**
1. Open Docker Desktop application
2. Wait for it to fully load (check system tray)
3. Verify status:
```powershell
docker ps
```

### "Port 3000 already in use"

**Solution:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace XXXX with PID)
taskkill /PID XXXX /F

# Or change port in backend-api/.env
```

### "PostgreSQL connection refused"

**Solution:**
```powershell
# Ensure Docker Compose is running
docker-compose up -d

# Verify PostgreSQL is running
docker-compose logs postgres

# Wait 10-15 seconds for PostgreSQL to initialize
```

## Verification Checklist

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm 9+ installed (`npm --version`)
- [ ] Docker installed (`docker --version`)
- [ ] Docker Compose installed (`docker-compose --version`)
- [ ] Flutter installed (`flutter --version`)
- [ ] Flutter dependencies installed (`flutter pub get` completed)
- [ ] Backend dependencies installed (`npm install` completed)
- [ ] Docker services running (`docker-compose ps`)
- [ ] Backend server starts (`npm run start:dev`)
- [ ] Mobile app builds (`flutter run` on device/emulator)

## Next Steps

Once everything is installed and verified:

1. **Start Services:**
   ```powershell
   docker-compose up -d
   cd backend-api && npm run start:dev
   ```

2. **Configure Firebase:**
   - Follow [firebase-setup.md](firebase-setup.md)
   - Update `mobile-app/lib/firebase_options.dart` with your credentials

3. **Run Mobile App:**
   ```powershell
   cd mobile-app
   flutter run
   ```

4. **Test the API:**
   - Open browser: http://localhost:3000/api/docs
   - Try endpoints in Swagger UI

## System Information

After installation, you can gather system info with:

```powershell
# Save system info to file
Get-ComputerInfo | Select-Object CsUserName, CsSystemType, WindowsInstallationType | 
  Out-File system-info.txt

# Or detailed:
systeminfo
```

## Quick Reference

| Tool | Command | Expected Version |
|------|---------|-----------------|
| Node.js | `node --version` | 18.0.0+ |
| npm | `npm --version` | 9.0.0+ |
| Docker | `docker --version` | 24.0.0+ |
| Docker Compose | `docker-compose --version` | 2.0.0+ |
| Flutter | `flutter --version` | 3.13.0+ |
| PostgreSQL | Docker image | 14.0+ |
| Redis | Docker image | 7.0+ |

## Getting Help

- **Flutter Issues**: https://flutter.dev/docs/testing/troubleshooting
- **NestJS Issues**: https://docs.nestjs.com
- **Docker Issues**: https://docs.docker.com/desktop/troubleshoot/
- **PostgreSQL Issues**: https://www.postgresql.org/docs/
