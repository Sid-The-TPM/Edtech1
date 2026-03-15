# Docker & Local Development Setup

## Prerequisites

Ensure you have:
- Docker Desktop installed and running
- Backend dependencies installed (`npm install --legacy-peer-deps` ✅ completed)
- Flutter SDK installed (optional - for testing locally first)

## Starting Services with Docker Compose

### Step 1: Start All Services

```powershell
cd "C:\Users\Admin\Documents\idea-generator-app"

# Start PostgreSQL, Redis, and backend containers
docker-compose up -d

# View status
docker-compose ps
```

Expected output:
```
NAME                COMMAND                  SERVICE      STATUS               PORTS
idea-generator-app-postgres-1    "docker-entrypoint.s..."   postgres     Up About a minute   0.0.0.0:5432->5432/tcp
idea-generator-app-redis-1       "redis-server --save ..."  redis        Up About a minute   0.0.0.0:6379->6379/tcp
idea-generator-app-backend-1     "npm run start:dev"        backend      Up About a minute   0.0.0.0:3000->3000/tcp
```

### Step 2: Verify Services are Healthy

```powershell
# Check PostgreSQL
docker-compose logs postgres

# Should show: "database system is ready to accept connections"

# Check Redis  
docker-compose logs redis

# Should show: "Ready to accept connections"

# Check Backend
docker-compose logs backend

# Should show: "[Nest] ... Nest application successfully started"
```

### Step 3: Access the Services

#### API Endpoint
```
http://localhost:3000
```

#### Swagger API Documentation
```
http://localhost:3000/api/docs
```

#### Database Connection
```
Host: localhost
Port: 5432
Database: edtech_db
User: edtech_user
Password: edtech_password_123
```

#### Redis Connection
```
Host: localhost
Port: 6379
(No authentication for development)
```

## Testing the Backend API

### Option 1: Using Swagger UI (Easiest)

1. Open browser: `http://localhost:3000/api/docs`
2. Try endpoints:
   - **POST /auth/register** - Create new user
   - **POST /auth/login** - Login user
   - **GET /users** - Get all users
   - **GET /courses** - Get all courses

### Option 2: Using curl Commands

#### Test Server Health
```powershell
curl http://localhost:3000/health

# Response:
# {"status":"ok"}
```

#### Register New User
```powershell
curl -X POST http://localhost:3000/auth/register `
  -H "Content-Type: application/json" `
  -d @- << 'EOF'
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!",
  "role": "student"
}
EOF

# Response:
# {
#   "id": "uuid-here",
#   "name": "John Doe",
#   "email": "john@example.com",
#   "role": "student"
# }
```

#### Login User
```powershell
curl -X POST http://localhost:3000/auth/login `
  -H "Content-Type: application/json" `
  -d @- << 'EOF'
{
  "email": "john@example.com",
  "password": "Password123!"
}
EOF

# Response:
# {
#   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "user": {
#     "id": "uuid-here",
#     "email": "john@example.com"
#   }
# }
```

#### Get All Courses
```powershell
curl http://localhost:3000/courses `
  -H "Content-Type: application/json"

# Response:
# {
#   "data": [],
#   "total": 0,
#   "page": 1,
#   "limit": 10
# }
```

#### Create Course (Admin Only)
```powershell
$token = "YOUR_JWT_TOKEN_FROM_LOGIN"

curl -X POST http://localhost:3000/courses `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer $token" `
  -d @- << 'EOF'
{
  "title": "Mathematics 101",
  "description": "Learn basic mathematics",
  "subject": "Mathematics",
  "grade": "11"
}
EOF
```

### Option 3: Using Postman API Client

1. **Import Collection:**
   - Open Postman
   - Go to File → Import
   - Paste Swagger URL: `http://localhost:3000/api/docs`
   - Click Import

2. **Test Endpoints:**
   - Auth → Register
   - Auth → Login
   - Courses → Get All
   - Courses → Create (use token from login)

## Accessing Database

### Option 1: Using pgAdmin (GUI)

Add to docker-compose.yml:
```yaml
pgadmin:
  image: dpage/pgadmin4:latest
  environment:
    PGADMIN_DEFAULT_EMAIL: admin@example.com
    PGADMIN_DEFAULT_PASSWORD: admin
  ports:
    - "5050:80"
  depends_on:
    - postgres
```

Then access: http://localhost:5050

### Option 2: Using psql Command Line

```powershell
# Connect to database
docker-compose exec postgres psql -U edtech_user -d edtech_db

# View tables
\dt

# View table structure
\d users

# Run SQL query
SELECT * FROM users;

# Exit
\q
```

### Option 3: Using Database IDE

- **DataGrip**: JetBrains IDE for databases
- **DBeaver**: Free, open-source database client
- **VS Code Extension**: SQLTools extension

1. Install extension
2. Create connection:
   - Host: `localhost`
   - Port: `5432`
   - Database: `edtech_db`
   - User: `edtech_user`
   - Password: `edtech_password_123`

## Monitoring Services

### View Real-Time Logs

```powershell
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f postgres
docker-compose logs -f redis

# Last 100 lines
docker-compose logs --tail=100

# Since specific time
docker-compose logs --since 10m
```

### View Service Statistics

```powershell
# Check memory/CPU usage
docker stats

# Or for specific container
docker stats idea-generator-app-backend-1
```

### Check Service Health

```powershell
# View health status
docker-compose ps

# Inspect specific service
docker inspect idea-generator-app-postgres-1
```

## Managing Services

### Stop Services (Keep Data)

```powershell
docker-compose stop

# Or specific service
docker-compose stop backend
docker-compose stop postgres
```

### Start Services

```powershell
docker-compose start

# Or specific service
docker-compose start backend
```

### Restart Services

```powershell
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
```

### Stop and Remove (Delete Data)

⚠️ **Warning:** This deletes the database!

```powershell
docker-compose down

# Also remove volumes (database data)
docker-compose down -v
```

### Update and Rebuild Services

```powershell
# Stop and remove containers
docker-compose down

# Rebuild images
docker-compose build --no-cache

# Start services
docker-compose up -d
```

## Executing Commands in Containers

### Run Command in Backend Container

```powershell
# View npm scripts
docker-compose exec backend npm run

# Run migrations
docker-compose exec backend npm run typeorm migration:run

# npm audit
docker-compose exec backend npm audit
```

### Run SQL in Database Container

```powershell
# Insert test data
docker-compose exec postgres psql -U edtech_user -d edtech_db -c "
  INSERT INTO courses (title, description, subject, grade) 
  VALUES ('Math 101', 'Learn Math', 'Mathematics', '11');
"

# Get data
docker-compose exec postgres psql -U edtech_user -d edtech_db -c "SELECT * FROM courses;"
```

### Run Redis Commands

```powershell
# Connect to Redis
docker-compose exec redis redis-cli

# Commands:
PING                    # Test connection
KEYS *                  # View all keys
FLUSHALL                # Clear all data
INFO                    # View stats
```

## Troubleshooting

### Service Won't Start

```powershell
# Check logs
docker-compose logs backend

# Common issues:
# - Port already in use: Change port in docker-compose.yml
# - Database not ready: Wait 15 seconds and restart
# - Memory issue: Increase Docker memory allocation
```

### Database Connection Error

```powershell
# Verify PostgreSQL is running
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres

# Wait 10 seconds then:
docker-compose logs postgres
```

### API Endpoint Returning 500 Error

```powershell
# Check backend logs
docker-compose logs backend -f

# Look for error messages and stack traces
# Common issues:
# - Database not initialized
# - Wrong connection string in .env
# - Missing JWT secret
```

### Cannot Connect to Backend from Mobile App

```powershell
# If on same machine:
http://localhost:3000  # Mobile running on machine

# If on different machine:
http://192.168.x.x:3000  # Use your machine's local IP
# Find IP: ipconfig

# If in emulator:
http://10.0.2.2:3000  # Android emulator special address
http://127.0.0.1:3000  # iOS simulator
```

## Performance Tuning

### Database Optimization

```powershell
# Check query performance
docker-compose exec postgres psql -U edtech_user -d edtech_db

# Run:
ANALYZE;
VACUUM;
```

### Redis Cache

```powershell
# Monitor Redis memory
docker-compose exec redis redis-cli INFO memory

# Clear old cache
docker-compose exec redis redis-cli FLUSHDB
```

### Backend Optimization

```powershell
# View current environment
docker-compose exec backend npm run | grep script

# Enable clustering (optional)
# Modify main.ts to use clustering for multi-core systems
```

## Development Workflow

### Typical Day

1. **Start Services:**
```powershell
docker-compose up -d
```

2. **Monitor Logs:**
```powershell
docker-compose logs -f backend
```

3. **Make Code Changes:**
- Backend: Automatic reload with `npm run start:dev`
- Database: Changes reflected immediately
- Frontend: Run `flutter run` with auto-reload

4. **Test Changes:**
- Swagger UI: http://localhost:3000/api/docs
- Mobile App: `flutter run`

5. **End of Day:**
```powershell
docker-compose down
```

## Backup Database

```powershell
# Backup PostgreSQL
docker-compose exec postgres pg_dump -U edtech_user edtech_db > backup.sql

# Restore
docker-compose exec -T postgres psql -U edtech_user edtech_db < backup.sql
```

## Environment Variables

Current settings in `.env`:

```
DATABASE_URL=postgresql://edtech_user:edtech_password_123@postgres:5432/edtech_db
JWT_SECRET=edtech_jwt_secret_key_development_only_change_in_production
REDIS_URL=redis://redis:6379
NODE_ENV=development
PORT=3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:8080
LOG_LEVEL=debug
```

To change settings:
1. Edit `backend-api/.env`
2. Restart backend: `docker-compose restart backend`

## Next Steps

1. ✅ Services running on Docker
2. 📋 Test API with Swagger UI
3. 📱 Install Flutter and run mobile app
4. 🔧 Configure Firebase credentials
5. 🚀 Deploy to Kubernetes (production)

For deployment to cloud, see [deployment-guide.md](deployment-guide.md)
