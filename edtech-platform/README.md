# EdTech Learning Platform - Production Grade

Complete educational platform with Flutter mobile apps, NestJS microservices, PostgreSQL, Redis, and Kubernetes deployment.

## Architecture Overview

```
Mobile Apps (Flutter)
    ↓
API Gateway (NestJS)
    ↓
Microservices
├── User Service
├── Course Service
├── Video Service
├── Quiz Service
├── Progress Service
├── Notification Service
└── Search Service
    ↓
PostgreSQL + Redis + Elasticsearch
    ↓
AWS S3 + CDN + Firebase + Analytics
```

## Project Structure

```
edtech-platform/
├── backend-api/                 # API Gateway + User Service
├── services/                    # Microservices
│   ├── course-service/
│   ├── video-service/
│   ├── quiz-service/
│   ├── progress-service/
│   ├── notification-service/
│   └── search-service/
├── mobile-app/                  # Student Flutter App
├── admin-app/                   # Admin Flutter App
├── database/                    # SQL Migrations
├── docker/                      # Docker configs
├── kubernetes/                  # K8s manifests
├── infrastructure/              # IaC configs
└── documentation/               # API docs, architecture
```

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Flutter SDK 3.x
- Node.js 18+
- PostgreSQL 15
- Redis 7

### Development Setup

```bash
# Start infrastructure
docker-compose -f docker/docker-compose.yml up -d

# Backend API
cd backend-api
npm install
npm run start:dev

# Mobile App
cd mobile-app
flutter pub get
flutter run -d chrome

# Admin App
cd admin-app
flutter pub get
flutter run -d chrome
```

### Production Deployment

```bash
# Build Docker images
docker build -t edtech-backend:1.0.0 -f docker/backend.Dockerfile .
docker build -t edtech-mobile:1.0.0 -f docker/mobile.Dockerfile .

# Deploy to Kubernetes
kubectl apply -f kubernetes/
```

## Features

### Student App
- User authentication (JWT)
- Browse courses, subjects, chapters
- Watch video lectures
- Download documents
- Take quizzes
- Track learning progress
- Receive push notifications
- Search lectures
- Offline mode

### Admin App
- Content management
- Create courses/subjects/chapters
- Upload video lectures
- Upload documents
- Create quizzes
- View analytics
- Monitor student progress

### Backend Services
- Microservices architecture
- RESTful APIs with versioning
- Role-based access control
- Rate limiting
- Request/response validation
- Caching with Redis
- Full-text search with Elasticsearch
- Real-time notifications
- Comprehensive logging and tracing

## Database

PostgreSQL 15 with migrations:
- Users table
- Courses, Subjects, Chapters
- Lectures, Documents
- Quizzes, Quiz Questions, Quiz Attempts
- Progress tracking
- User sessions

## Deployment Options

- **Docker Compose** - Local development
- **Kubernetes** - Production scaling
- **AWS ECS** - AWS-native deployment
- **Google Cloud Run** - Serverless option

## Security

- JWT authentication
- bcrypt password hashing
- RBAC (Student, Admin roles)
- CORS configuration
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection

## Monitoring & Observability

- Prometheus metrics
- Jaeger distributed tracing
- Elastic Stack logging
- Custom request tracing
- Performance monitoring

## API Documentation

Full API documentation available in `documentation/api-specification.md`

## License

MIT
