# Quick Start Guide

## Prerequisites

Before starting, ensure you have:

- **Node.js** 18+ and npm 9+
- **Flutter** 3.13+
- **Docker & Docker Compose**
- **PostgreSQL** 14+ (for local development)
- **Redis** 7+ (for caching)

## Option 1: Local Development (Fastest)

### 1. Start Database Services

```bash
cd idea-generator-app

# Start PostgreSQL and Redis using Docker Compose
docker-compose up -d
```

Verify services are running:
```bash
docker-compose ps
# Should show: postgres, redis, and backend services as created/running
```

### 2. Start Backend API

```bash
cd backend-api

# Install dependencies (if not done yet)
npm install --legacy-peer-deps

# Start development server with hot reload
npm run start:dev
```

Expected output:
```
[Nest] 12345  - 01/01/2024, 10:00:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 01/01/2024, 10:00:01 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +250ms
...
[Nest] 12345  - 01/01/2024, 10:00:05 AM     LOG [NestApplication] Nest application successfully started +1234ms
✅ Server running on http://localhost:3000
📚 API Docs available at http://localhost:3000/api/docs
```

### 3. Start Mobile App

In a new terminal:

```bash
cd mobile-app

# Install Flutter dependencies
flutter pub get

# Run on emulator/device
flutter run

# Or specify device
flutter run -d emulator-5554  # Android
flutter run -d iPhone-15-Pro   # iOS simulator
```

### 4. Open in Browser

- **API Documentation**: http://localhost:3000/api/docs
- **Swagger UI**: Test endpoints directly in the browser

## Option 2: Docker Compose Full Setup

All services in containers:

```bash
docker-compose up -d

# View logs
docker-compose logs -f

# For mobile app, still run locally:
cd mobile-app
flutter pub get
flutter run
```

## Verify Everything is Working

### Check Backend Health

```bash
# In a new terminal
curl http://localhost:3000/health

# Expected response:
# {"status":"ok","timestamp":"2024-01-01T10:00:00Z"}
```

### Check Database Connection

```bash
# Login to database
psql postgresql://edtech_user:edtech_password_123@localhost:5432/edtech_db

# Show tables
\dt

# Exit
\q
```

### Check Mobile App

When you run `flutter run`, you should see:
- Login screen appears
- App connects to backend at localhost:3000
- No authentication errors

## Common Commands

### Backend Development

```bash
# Watch mode with hot reload
npm run start:dev

# Production build
npm run build

# Run production version
npm run start

# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Check code style
npm run lint

# Format code
npm run format

# View database migrations
npm run typeorm migration:show

# Run migrations
npm run typeorm migration:run

# Create new migration
npm run typeorm migration:create -- src/migrations/AddNewTable
```

### Mobile App Development

```bash
# Install dependencies
flutter pub get

# Get latest dependencies
flutter pub upgrade

# Run on connected device
flutter run

# Run with verbose output
flutter run -v

# Build APK for Android
flutter build apk

# Build IPA for iOS
flutter build ipa

# Clean build
flutter clean

# Get dependencies and run
flutter pub get && flutter run
```

### Docker Services

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Stop and remove volumes (cleanup)
docker-compose down -v

# Rebuild services
docker-compose up -d --build

# View specific service logs
docker-compose logs -f backend

# Access database container
docker-compose exec postgres psql -U edtech_user -d edtech_db
```

## Project Structure

```
idea-generator-app/
├── mobile-app/              # Flutter iOS/Android app
│   ├── lib/
│   │   ├── main.dart        # Entry point with Firebase
│   │   ├── models/          # Data models
│   │   ├── services/        # API & Firebase services
│   │   ├── screens/         # UI screens
│   │   └── core/            # Configuration & themes
│   └── pubspec.yaml         # Flutter dependencies
│
├── backend-api/             # NestJS REST API
│   ├── src/
│   │   ├── main.ts          # Entry point
│   │   ├── modules/         # Feature modules (auth, users, courses, etc.)
│   │   ├── entities/        # Database models
│   │   └── decorators/      # Custom decorators
│   ├── package.json         # npm dependencies
│   └── .env                 # Environment variables
│
├── infrastructure/          # Deployment configs
│   ├── docker-compose.yml   # Local development services
│   ├── Dockerfile           # Backend container image
│   └── kubernetes/          # K8s deployments
│
├── docs/                    # Documentation
│   ├── README.md
│   ├── api-specification.md
│   ├── database-schema.md
│   ├── deployment-guide.md
│   ├── firebase-setup.md
│   └── environment-setup.md
│
└── scripts/                 # Setup scripts
    ├── setup.sh             # Linux/Mac setup
    └── setup.bat            # Windows setup
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000 (backend)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Alternative: Change PORT in backend-api/.env
PORT=3001
```

### Database Connection Failed

```bash
# Check PostgreSQL is running
docker-compose ps

# Restart PostgreSQL
docker-compose restart postgres

# Verify connection string in .env
cat backend-api/.env | grep DATABASE_URL
```

### Flutter Build Issues

```bash
# Clean everything
flutter clean
cd mobile-app

# Remove pubspec lock
rm pubspec.lock

# Reinstall dependencies
flutter pub get

# Run again
flutter run
```

### Docker Issues

```bash
# Remove all containers and start fresh
docker-compose down -v
docker-compose up -d

# View detailed logs
docker-compose logs -f --tail=100
```

## Environment Files

### Backend (.env)

```
DATABASE_URL=postgresql://edtech_user:edtech_password_123@localhost:5432/edtech_db
JWT_SECRET=edtech_jwt_secret_key_development_only_change_in_production
REDIS_URL=redis://localhost:6379
NODE_ENV=development
PORT=3000
ALLOWED_ORIGINS=http://localhost,http://localhost:3000,http://localhost:3001,http://localhost:8080
LOG_LEVEL=debug
```

### Firebase (mobile-app/lib/firebase_options.dart)

Update with your Firebase credentials from Firebase Console.

## Next Steps

1. **Complete Firebase Setup**: Follow [firebase-setup.md](firebase-setup.md)
2. **Run Integration Tests**: Use Swagger UI to test API endpoints
3. **Deploy to Cloud**: Follow [deployment-guide.md](deployment-guide.md)
4. **Set Up CI/CD**: GitHub Actions workflows in `.github/workflows/`

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Flutter Documentation](https://flutter.dev/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Docker Documentation](https://docs.docker.com)
- [API Documentation](http://localhost:3000/api/docs) (once running)

## Support

For issues:
1. Check [deployment-guide.md](deployment-guide.md) for common solutions
2. Review [environment-setup.md](environment-setup.md) for configuration issues
3. Check GitHub Issues for known problems
4. Review Docker logs: `docker-compose logs -f`
