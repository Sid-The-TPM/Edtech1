# API Specification

## Base URL
```
https://api.edtech-platform.com/api/v1
```

## Authentication
All protected endpoints require Bearer token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Response Format

### Success Response (2xx)
```json
{
  "data": { /* response data */ },
  "status": "success",
  "timestamp": "2024-03-14T10:30:00Z"
}
```

### Error Response (4xx, 5xx)
```json
{
  "error": "Error message",
  "status": "error",
  "statusCode": 400,
  "timestamp": "2024-03-14T10:30:00Z"
}
```

## Endpoints

### Authentication

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "role": "student"
}

Response (201):
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "userId": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response (200):
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": { /* user data */ }
}
```

### Courses

#### List All Courses
```
GET /courses
Authorization: Bearer <token>

Response (200):
[
  {
    "courseId": "uuid",
    "title": "Class 11 Physics",
    "description": "Physics course for class 11",
    "code": "PHY-11",
    "createdBy": "admin-uuid",
    "createdAt": "2024-03-14T10:00:00Z",
    "updatedAt": "2024-03-14T10:00:00Z"
  }
]
```

#### Get Single Course
```
GET /courses/{courseId}
Authorization: Bearer <token>

Response (200):
{
  "courseId": "uuid",
  "title": "Class 11 Physics",
  /* full course data */
}
```

#### Create Course (Admin)
```
POST /courses
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Class 11 Physics",
  "description": "Physics course for class 11",
  "code": "PHY-11"
}

Response (201):
{ /* created course */ }
```

#### Update Course (Admin)
```
PUT /courses/{courseId}
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Class 11 Physics Updated",
  "description": "Updated description"
}

Response (200):
{ /* updated course */ }
```

#### Delete Course (Admin)
```
DELETE /courses/{courseId}
Authorization: Bearer <admin_token>

Response (200):
{
  "message": "Course deleted successfully"
}
```

### Users

#### Get All Users (Admin)
```
GET /users
Authorization: Bearer <admin_token>

Response (200):
[
  {
    "userId": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "createdAt": "2024-03-14T10:00:00Z"
  }
]
```

#### Get User Profile
```
GET /users/{userId}
Authorization: Bearer <token>

Response (200):
{ /* user data */ }
```

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid authentication token |
| 403 | Forbidden | User doesn't have permission to access resource |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists (e.g., duplicate email) |
| 500 | Internal Server Error | Server error |

## Rate Limiting

All endpoints are rate limited:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Pagination

List endpoints support pagination:
```
GET /courses?page=1&limit=10&sortBy=createdAt&sortOrder=desc

Response includes:
{
  "data": [ /* items */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```
