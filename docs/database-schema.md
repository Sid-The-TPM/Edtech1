# Database Schema

## Users Table
- **userId** (UUID, Primary Key)
- **name** (String)
- **email** (String, Unique)
- **passwordHash** (String)
- **role** (Enum: 'admin', 'student')
- **profileImage** (String, Nullable)
- **createdAt** (Timestamp)
- **updatedAt** (Timestamp)

## Courses Table
- **courseId** (UUID, Primary Key)
- **title** (String)
- **description** (String, Nullable)
- **imageUrl** (String, Nullable)
- **code** (String, Nullable)
- **createdBy** (UUID, Foreign Key → Users)
- **createdAt** (Timestamp)
- **updatedAt** (Timestamp)

## Chapters Table
- **chapterId** (UUID, Primary Key)
- **courseId** (UUID, Foreign Key → Courses)
- **title** (String)
- **description** (String, Nullable)
- **order** (Integer, Nullable)
- **createdAt** (Timestamp)
- **updatedAt** (Timestamp)

## Lectures Table
- **lectureId** (UUID, Primary Key)
- **chapterId** (UUID, Foreign Key → Chapters)
- **title** (String)
- **youtubeUrl** (String)
- **description** (String, Nullable)
- **duration** (Integer, Nullable) - in seconds
- **order** (Integer, Nullable)
- **createdAt** (Timestamp)
- **updatedAt** (Timestamp)

## Documents Table
- **documentId** (UUID, Primary Key)
- **chapterId** (UUID, Foreign Key → Chapters)
- **title** (String)
- **fileUrl** (String)
- **fileType** (String) - pdf, doc, docx, txt
- **fileSize** (Integer, Nullable)
- **description** (String, Nullable)
- **createdAt** (Timestamp)
- **updatedAt** (Timestamp)

## Quizzes Table
- **quizId** (UUID, Primary Key)
- **chapterId** (UUID, Foreign Key → Chapters)
- **title** (String)
- **description** (String, Nullable)
- **timeLimit** (Integer, Nullable) - in minutes
- **passingPercentage** (Integer, Default: 50)
- **createdAt** (Timestamp)

## Quiz Questions Table
- **questionId** (UUID, Primary Key)
- **quizId** (UUID, Foreign Key → Quizzes)
- **questionText** (String)
- **options** (Array of Strings)
- **correctAnswerIndex** (Integer)
- **explanation** (String, Nullable)

## Quiz Attempts Table
- **attemptId** (UUID, Primary Key)
- **userId** (UUID, Foreign Key → Users)
- **quizId** (UUID, Foreign Key → Quizzes)
- **score** (Integer)
- **totalQuestions** (Integer)
- **answers** (Array of Integers)
- **timeTaken** (Integer, Nullable) - in seconds
- **attemptedAt** (Timestamp)

## Progress Table
- **progressId** (UUID, Primary Key)
- **userId** (UUID, Foreign Key → Users)
- **lectureId** (UUID, Foreign Key → Lectures)
- **watchPercentage** (Decimal: 0-100)
- **isCompleted** (Boolean)
- **createdAt** (Timestamp)
- **updatedAt** (Timestamp)

## Indexes
- Users: INDEX on email
- Courses: INDEX on createdBy
- Chapters: INDEX on courseId
- Lectures: INDEX on chapterId
- Documents: INDEX on chapterId
- Quizzes: INDEX on chapterId
- Quiz Attempts: INDEX on userId, quizId
- Progress: INDEX on userId, lectureId (Unique constraint)
