# Development Guide

## Setup

### Prerequisites
- Node.js 18+
- Flutter SDK 3.13+
- PostgreSQL 15+
- Redis 7+
- VS Code or Android Studio
- Git

### Installation

#### Backend Setup

1. Navigate to backend directory:
```bash
cd backend-api
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update environment variables:
```
DATABASE_URL=postgresql://user:password@localhost:5432/edtech_db
JWT_SECRET=your_jwt_secret_key
REDIS_URL=redis://localhost:6379
NODE_ENV=development
PORT=3000
```

5. Run database migrations:
```bash
npm run migration:run
```

6. Start development server:
```bash
npm run start:dev
```

#### Mobile Setup

1. Navigate to mobile directory:
```bash
cd mobile-app
```

2. Get Flutter dependencies:
```bash
flutter pub get
```

3. Update Firebase configuration:
   - Download `google-services.json` from Firebase Console
   - Place in `android/app/`
   - Download `GoogleService-Info.plist` and place in `ios/Runner/`

4. Run the app:
```bash
flutter run
```

## Code Structure

### Backend (NestJS)

```
backend-api/src/
├── modules/
│   ├── auth/           # Authentication module
│   ├── users/          # User management
│   ├── courses/        # Course management
│   ├── chapters/       # Chapter management
│   ├── lectures/       # Lecture management
│   ├── documents/      # Document management
│   ├── quizzes/        # Quiz management
│   └── progress/       # Progress tracking
├── common/
│   ├── filters/        # Exception filters
│   ├── interceptors/   # HTTP interceptors
│   ├── guards/         # Authorization guards
│   └── decorators/     # Custom decorators
├── utils/              # Utility functions
├── app.module.ts       # Root module
├── main.ts            # Application entry point
```

### Mobile App (Flutter)

```
mobile-app/lib/
├── core/
│   ├── constants/      # App constants
│   ├── theme/          # Theme configuration
│   └── utils/          # Utility functions
├── services/           # Business logic & API calls
├── models/             # Data models
├── repositories/       # Data repositories
├── screens/            # UI screens
├── widgets/            # Reusable widgets
├── main.dart          # App entry point
```

## Coding Standards

### Naming Conventions

- **Classes**: PascalCase (e.g., `UserModel`, `AuthService`)
- **Functions/Methods**: camelCase (e.g., `getUserProfile()`, `handleLogin()`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_TIMEOUT`, `DB_CONNECTION_POOL_SIZE`)
- **Variables**: camelCase (e.g., `isLoading`, `userName`)
- **Files**: 
  - Dart: snake_case (e.g., `user_model.dart`)
  - TypeScript: camelCase for components (e.g., `auth.service.ts`)

### Code Quality

#### TypeScript/NestJS
- Use strict typing
- Add JSDoc comments for public methods
- Follow SOLID principles
- Use dependency injection

```typescript
/**
 * Get user by ID
 * @param userId The user ID
 * @returns User object or null if not found
 */
async getUserById(userId: string): Promise<User | null> {
  return this.usersRepository.findOne({ where: { userId } });
}
```

#### Flutter/Dart
- Use meaningful variable names
- Add documentation comments
- Follow Material Design guidelines
- Use const constructors when possible

```dart
/// Validates email format
/// Returns true if email is valid
bool isValidEmail(String email) {
  return RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
      .hasMatch(email);
}
```

## Testing

### Backend Tests

Run unit tests:
```bash
npm run test
```

Run tests with coverage:
```bash
npm run test:cov
```

Run e2e tests:
```bash
npm run test:e2e
```

### Mobile Tests

Run Flutter tests:
```bash
flutter test
```

Run with coverage:
```bash
flutter test --coverage
```

## Git Workflow

### Commit Messages

Follow conventional commits:
```
type(scope): description

feat(auth): add JWT token refresh endpoint
fix(courses): handle concurrent requests
docs(api): update API documentation
test(lectures): add unit tests for lecture service
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions/changes

### Branch Naming

```
feature/add-user-dashboard
bugfix/fix-video-playback
hotfix/critical-auth-issue
```

## Debugging

### Backend Debugging

Debug with VS Code:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "NestJS Debug",
      "program": "${workspaceFolder}/backend-api/dist/main.js",
      "restart": true,
      "runtimeArgs": [
        "--nolazy"
      ],
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal"
    }
  ]
}
```

### Mobile Debugging

Use Flutter DevTools:
```bash
flutter pub global activate devtools
flutter pub global run devtools
flutter run --observatory-port=8888
```

## Documentation

- **API Docs**: Generated automatically with Swagger
- **Code Comments**: Use for complex logic
- **README**: Update when adding new features
- **CHANGELOG**: Document all changes

## Performance Tips

### Backend
- Use database indexing
- Implement caching with Redis
- Batch database queries
- Use pagination for large datasets
- Monitor query performance

### Mobile
- Use ListView builders instead of Column for large lists
- Cache network responses
- Implement offline mode
- Optimize image sizes
- Minimize widget rebuilds

## Security

- Never commit `.env` files
- Use environment variables for secrets
- Validate all user inputs
- Sanitize database queries
- Keep dependencies updated
- Review security advisories

## Learning Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Flutter Documentation](https://flutter.dev/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
