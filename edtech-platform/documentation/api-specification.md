# Complete API Specification for EdTech Platform

## Base URL
- Development: `http://localhost:3000/api/v1`
- Production: `https://api.edtech.com/api/v1`

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer {token}
```

---

## 1. Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "role": "student" | "admin"
}

Response: 201 Created
{
  "userId": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student",
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}

Response: 200 OK
{
  "userId": "uuid",
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token",
  "expiresIn": 86400
}
```

### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token"
}

Response: 200 OK
{
  "accessToken": "new_jwt_token",
  "expiresIn": 86400
}
```

### Logout
```http
POST /auth/logout
Authorization: Bearer {token}

Response: 200 OK
{
  "message": "Logged out successfully"
}
```

---

## 2. User Management Endpoints

### Get Current User
```http
GET /users/me
Authorization: Bearer {token}

Response: 200 OK
{
  "userId": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student",
  "avatarUrl": "https://...",
  "bio": "Student bio",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Update Profile
```http
PATCH /users/me
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Doe",
  "bio": "Updated bio",
  "avatarUrl": "https://..."
}

Response: 200 OK
```

### Change Password
```http
POST /users/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword123!"
}

Response: 200 OK
```

---

## 3. Course Endpoints

### Get All Courses
```http
GET /courses?page=1&limit=20&search=physics&published=true
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "courseId": "uuid",
      "title": "Class 11 Physics",
      "description": "...",
      "thumbnailUrl": "https://...",
      "totalStudents": 150,
      "avgRating": 4.5,
      "isPublished": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "pageSize": 20,
    "totalPages": 3
  }
}
```

### Get Course Details
```http
GET /courses/{courseId}
Authorization: Bearer {token}

Response: 200 OK
{
  "courseId": "uuid",
  "title": "Class 11 Physics",
  "description": "...",
  "subjects": [
    {
      "subjectId": "uuid",
      "title": "Kinematics",
      "chapters": [...]
    }
  ],
  "enrollments": 150,
  "avgRating": 4.5
}
```

### Create Course (Admin Only)
```http
POST /admin/courses
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "Class 12 Chemistry",
  "description": "Advanced chemistry course",
  "thumbnailUrl": "https://..."
}

Response: 201 Created
```

### Update Course (Admin Only)
```http
PATCH /admin/courses/{courseId}
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}

Response: 200 OK
```

### Publish Course (Admin Only)
```http
POST /admin/courses/{courseId}/publish
Authorization: Bearer {admin_token}

Response: 200 OK
```

---

## 4. Subject Endpoints

### Get Subjects in Course
```http
GET /courses/{courseId}/subjects
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "subjectId": "uuid",
      "title": "Thermodynamics",
      "description": "...",
      "chapters": [...]
    }
  ]
}
```

### Create Subject (Admin Only)
```http
POST /admin/courses/{courseId}/subjects
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "Waves & Optics",
  "description": "...",
  "order": 3
}

Response: 201 Created
```

---

## 5. Chapter Endpoints

### Get Chapters in Subject
```http
GET /subjects/{subjectId}/chapters
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "chapterId": "uuid",
      "title": "Chapter 1: Introduction",
      "lectures": [...]
    }
  ]
}
```

### Create Chapter (Admin Only)
```http
POST /admin/subjects/{subjectId}/chapters
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "Chapter 5: Advanced Topics",
  "description": "...",
  "order": 5
}

Response: 201 Created
```

---

## 6. Lecture Endpoints

### Get Lectures in Chapter
```http
GET /chapters/{chapterId}/lectures
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "lectureId": "uuid",
      "title": "Lecture 1: Introduction to Vectors",
      "videoUrl": "https://youtube.com/watch?v=...",
      "durationSeconds": 1200,
      "thumbnailUrl": "https://...",
      "viewCount": 5000
    }
  ]
}
```

### Get Lecture Details with Progress
```http
GET /lectures/{lectureId}
Authorization: Bearer {token}

Response: 200 OK
{
  "lectureId": "uuid",
  "title": "Lecture 1: Introduction to Vectors",
  "videoUrl": "https://youtube.com/watch?v=...",
  "durationSeconds": 1200,
  "description": "...",
  "viewCount": 5000,
  "avgRating": 4.7,
  "userProgress": {
    "watchPercentage": 75,
    "lastWatchedAt": "2024-01-15T10:30:00Z",
    "watchDurationSeconds": 900,
    "isBookmarked": true,
    "isCompleted": false
  }
}
```

### Upload Lecture (Admin Only)
```http
POST /admin/chapters/{chapterId}/lectures
Authorization: Bearer {admin_token}
Content-Type: multipart/form-data

{
  "title": "Lecture 2",
  "description": "...",
  "video": <binary>,
  "videoType": "s3" | "youtube" | "vimeo"
}

Response: 201 Created
```

---

## 7. Progress Tracking Endpoints

### Update Watch Progress
```http
PATCH /progress/{lectureId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "watchPercentage": 75,
  "watchDurationSeconds": 900
}

Response: 200 OK
```

### Get User Progress
```http
GET /progress/course/{courseId}
Authorization: Bearer {token}

Response: 200 OK
{
  "courseId": "uuid",
  "totalLectures": 50,
  "completedLectures": 35,
  "progressPercentage": 70,
  "lectures": [
    {
      "lectureId": "uuid",
      "title": "...",
      "watchPercentage": 100,
      "isCompleted": true
    }
  ]
}
```

---

## 8. Quiz Endpoints

### Get Quizzes in Chapter
```http
GET /chapters/{chapterId}/quizzes
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "quizId": "uuid",
      "title": "Chapter 1 Quiz",
      "totalQuestions": 10,
      "timeLimitMinutes": 15,
      "passingPercentage": 60
    }
  ]
}
```

### Get Quiz with Questions
```http
GET /quizzes/{quizId}
Authorization: Bearer {token}

Response: 200 OK
{
  "quizId": "uuid",
  "title": "Chapter 1 Quiz",
  "timeLimitMinutes": 15,
  "questions": [
    {
      "questionId": "uuid",
      "questionText": "What is the SI unit of velocity?",
      "questionType": "multiple_choice",
      "optionA": "m/s",
      "optionB": "km/h",
      "optionC": "cm/s",
      "optionD": "ft/s"
    }
  ]
}
```

### Submit Quiz Attempt
```http
POST /quizzes/{quizId}/attempts
Authorization: Bearer {token}
Content-Type: application/json

{
  "answers": [
    {
      "questionId": "uuid",
      "selectedAnswer": "A"
    }
  ]
}

Response: 201 Created
{
  "attemptId": "uuid",
  "quizId": "uuid",
  "score": 85,
  "maxScore": 100,
  "passed": true,
  "timeSpenSeconds": 600,
  "answers": [...]
}
```

### Get Quiz Attempts
```http
GET /quizzes/{quizId}/attempts
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "attemptId": "uuid",
      "score": 85,
      "maxScore": 100,
      "passed": true,
      "timeSpenSeconds": 600,
      "attemptedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## 9. Bookmark Endpoints

### Add Bookmark
```http
POST /bookmarks/lectures/{lectureId}
Authorization: Bearer {token}

Response: 201 Created
```

### Remove Bookmark
```http
DELETE /bookmarks/lectures/{lectureId}
Authorization: Bearer {token}

Response: 204 No Content
```

### Get Bookmarks
```http
GET /bookmarks?page=1&limit=20
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "bookmarkId": "uuid",
      "lecture": {...},
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {...}
}
```

---

## 10. Notification Endpoints

### Get Notifications
```http
GET /notifications?limit=20&unreadOnly=false
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "notificationId": "uuid",
      "title": "New Lecture",
      "message": "A new lecture has been uploaded",
      "type": "new_lecture",
      "isRead": false,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Mark as Read
```http
PATCH /notifications/{notificationId}/read
Authorization: Bearer {token}

Response: 200 OK
```

### Mark All as Read
```http
PATCH /notifications/mark-all-read
Authorization: Bearer {token}

Response: 200 OK
```

---

## 11. Search Endpoints

### Search Lectures
```http
GET /search/lectures?query=vectors&page=1&limit=20
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "lectureId": "uuid",
      "title": "Lecture: Vector Operations",
      "chapter": "...",
      "subject": "...",
      "course": "..."
    }
  ],
  "pagination": {...}
}
```

### Search Chapters
```http
GET /search/chapters?query=kinematics
Authorization: Bearer {token}

Response: 200 OK
```

---

## 12. Analytics Endpoints (Admin Only)

### Get Dashboard Analytics
```http
GET /admin/analytics/dashboard?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer {admin_token}

Response: 200 OK
{
  "totalStudents": 1500,
  "activeStudents": 1200,
  "newStudents": 150,
  "totalLectures": 500,
  "lecturesWatched": 45000,
  "avgWatchTime": 1200,
  "quizAttempts": 5000,
  "avgScore": 78.5
}
```

### Get Student Progress
```http
GET /admin/analytics/student/{userId}
Authorization: Bearer {admin_token}

Response: 200 OK
{
  "studentId": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "enrolledCourses": 3,
  "completedCourses": 1,
  "totalLecturesWatched": 150,
  "avgQuzScore": 82,
  "totalStudyTime": 75600,
  "lastActive": "2024-01-15T10:30:00Z"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden",
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Not Found",
  "error": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "statusCode": 429,
  "message": "Too Many Requests",
  "retryAfter": 60
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal Server Error",
  "requestId": "uuid"
}
```

---

## Rate Limiting

- **Default**: 100 requests per 15 minutes
- **Auth Endpoints**: 5 requests per minute
- **Upload Endpoints**: 10 files per minute

---

## Pagination

All list endpoints support:
- `?page=1` - Page number (default: 1)
- `?limit=20` - Items per page (max: 100, default: 20)
- `?sort=createdAt&order=desc` - Sort field and order

---

## Versioning

Current API version: **v1**

All endpoints use `/api/v1` prefix. New versions will be available at `/api/v2`, etc.
