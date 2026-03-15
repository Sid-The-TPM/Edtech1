# EduTech Learning Platform - Complete Documentation

## Overview

EduTech is a cross-platform educational learning platform that enables students to access structured learning content (video lectures, study materials, documents, and quizzes) on both iOS and Android devices. The platform includes admin capabilities for content management and student features for learning and progress tracking.

## Architecture

### System Overview
- **Frontend**: Flutter (iOS & Android)
- **Backend**: NestJS/Node.js with Express
- **Database**: PostgreSQL for structured data
- **Cache**: Redis for session and data caching
- **Storage**: Firebase Storage for documents and videos
- **Authentication**: Firebase Authentication & JWT
- **Notifications**: Firebase Cloud Messaging (FCM)
- **API Gateway**: RESTful API with Swagger documentation

### Project Structure

```
edtech-learning-platform/
├── mobile-app/              # Flutter mobile application
├── backend-api/             # NestJS backend API
├── admin-dashboard/         # React admin panel
├── infrastructure/          # Docker, Kubernetes, Terraform configs
├── docs/                    # Documentation
├── scripts/                 # Utility scripts
├── docker-compose.yml       # Local development setup
└── README.md               # Project README
```

## Deployment Guide

### Local Development Setup

#### Prerequisites
- Node.js 18+
- Flutter SDK 3.13+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose

#### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourepo/edtech-learning-platform.git
cd edtech-learning-platform
```

2. Start services with Docker Compose:
```bash
docker-compose up -d
```

3. Install backend dependencies:
```bash
cd backend-api
npm install
npm run start:dev
```

4. Install mobile app dependencies:
```bash
cd mobile-app
flutter pub get
flutter run
```

### Production Deployment

#### Using Kubernetes

1. Build Docker images:
```bash
docker build -t edtech-api:latest -f infrastructure/docker/Dockerfile.backend ./backend-api
```

2. Push to registry:
```bash
docker push your-registry/edtech-api:latest
```

3. Deploy to Kubernetes:
```bash
kubectl apply -f infrastructure/kubernetes/
```

#### Using AWS ECS/Fargate

1. Create ECR repository
2. Build and push Docker image
3. Create ECS task definition
4. Create ECS service

## API Documentation

API endpoints are documented using Swagger. After starting the backend, visit:
```
http://localhost:3000/api/docs
```

### Key Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user

#### Courses
- `GET /api/v1/courses` - List all courses
- `POST /api/v1/courses` - Create course (admin only)
- `GET /api/v1/courses/:id` - Get course details
- `PUT /api/v1/courses/:id` - Update course
- `DELETE /api/v1/courses/:id` - Delete course

#### Users
- `GET /api/v1/users` - List all users (admin only)
- `GET /api/v1/users/:id` - Get user profile
- `PUT /api/v1/users/:id` - Update user profile

## Security

### Authentication
- JWT (JSON Web Tokens) for API authentication
- Firebase Authentication for mobile app
- Password hashing with bcryptjs
- Secure password reset flow

### Authorization
- Role-based access control (RBAC)
- Admin-only endpoints protected with middleware
- Student-specific endpoint restrictions

### Data Protection
- PostgreSQL encryption at rest
- HTTPS/TLS for all API communications
- Secure storage of sensitive data

## Performance Optimization

### Caching
- Redis for session caching
- Query result caching
- Document caching on mobile

### Database
- Indexing on frequently queried fields
- Connection pooling
- Query optimization

### Mobile App
- Lazy loading of content
- Video streaming with adaptive quality
- Offline document support

## Development Workflow

### Git Branching Strategy
- `main` - Production ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Unit and integration tests

### CI/CD Pipeline
- Automated tests on push
- Build verification
- Security scanning
- Automated deployment to production

## Database Schema

See [database-schema.md](./docs/database-schema.md) for detailed database schema documentation.

## Maintenance

### Database Backups
- Automated daily backups
- Weekly full backups
- 30-day retention policy

### Monitoring
- Application performance monitoring
- Error tracking with Sentry
- Log aggregation with ELK Stack
- Uptime monitoring

### Updates
- Security patches applied within 48 hours
- Feature updates in monthly releases
- Database migrations tested in staging first

## Support & Troubleshooting

### Common Issues

#### Backend won't start
- Check environment variables in `.env`
- Ensure PostgreSQL and Redis are running
- Check logs: `docker-compose logs backend`

#### Mobile app connection failures
- Verify backend URL in Firebase options
- Check network connectivity
- Ensure JWT token is valid

#### Database migration errors
- Reset database: `npm run typeorm migration:revert`
- Run migrations again: `npm run typeorm migration:run`

## Contributing

1. Create feature branch from `develop`
2. Make changes and commit with meaningful messages
3. Push to remote and create pull request
4. After review and approval, merge to `develop`
5. Deploy to staging for testing
6. Merge to `main` for production release

## License

MIT License - See LICENSE file for details

## Contact

For issues, questions, or support:
- Create an issue on GitHub
- Contact: support@edtech-platform.com
