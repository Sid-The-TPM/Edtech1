# Firebase Configuration Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Enter project name: **edtech-learning-app**
4. Follow the setup wizard to create the project

## Step 2: Get Firebase Credentials

### For Web & Android:

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Click the **Service Accounts** tab
3. Under "Firebase Admin SDK", click **Generate New Private Key**
4. This downloads a JSON file - keep it safe
5. Copy the following values from the JSON and add to `firebase_options.dart`:
   - `apiKey` → from web config in Project Settings
   - `projectId`
   - `messagingSenderId`
   - `appId`
   - `authDomain`
   - `storageBucket`

### For Android:

1. In Firebase Console, go to **Project Settings**
2. Click **Android apps** section
3. Click **Add app** and select Android
4. Enter package name: `com.edtech.learningapp`
5. Download `google-services.json`
6. Place it in: `mobile-app/android/app/google-services.json`

### For iOS:

1. In Firebase Console, go to **Project Settings**
2. Click **iOS apps** section
3. Click **Add app** and select iOS
4. Enter bundle ID: `com.edtech.learningapp`
5. Download `GoogleService-Info.plist`
6. Place it in: `mobile-app/ios/Runner/GoogleService-Info.plist`

## Step 3: Enable Firebase Services

In Firebase Console, enable these services:

### Authentication
1. Go to **Authentication**
2. Click **Enable Email/Password**
3. Click **Enable Google Sign-In** (optional)

### Firestore Database
1. Go to **Firestore Database**
2. Click **Create Database**
3. Choose **Start in test mode** (for development)
4. Select region: **us-central1** or nearest
5. Click **Create**

### Cloud Storage
1. Go to **Storage**
2. Click **Get Started**
3. Accept default security rules
4. Finish setup

### Cloud Messaging
1. Go to **Cloud Messaging**
2. Note your **Sender ID** (needed for FCM setup)
3. Generate **Server Key** for backend

## Step 4: Update firebase_options.dart

Edit `mobile-app/lib/firebase_options.dart` and replace placeholders:

```dart
static const FirebaseOptions android = FirebaseOptions(
  apiKey: 'AIzaSyDvA1234567890ABCDEFGHIJKLMNOPQRSTU',  // From google-services.json
  appId: '1:123456789:android:abcdef1234567890',        // From google-services.json
  messagingSenderId: '123456789',                        // From google-services.json
  projectId: 'edtech-learning-app',
  storageBucket: 'edtech-learning-app.appspot.com',
);
```

## Step 5: Firestore Security Rules

Replace default rules in Firebase Console **Firestore → Rules**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - own data only
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read: if request.auth.token.role == 'admin';
    }
    
    // Courses - public read, admin write
    match /courses/{courseId} {
      allow read: if true;
      allow create, update, delete: if request.auth.token.role == 'admin';
    }
    
    // Chapters - public read, admin write
    match /chapters/{chapterId} {
      allow read: if true;
      allow create, update, delete: if request.auth.token.role == 'admin';
    }
    
    // Lectures - public read, admin write
    match /lectures/{lectureId} {
      allow read: if true;
      allow create, update, delete: if request.auth.token.role == 'admin';
    }
    
    // Documents - public read, admin write
    match /documents/{documentId} {
      allow read: if true;
      allow create, update, delete: if request.auth.token.role == 'admin';
    }
    
    // Quizzes - public read, admin write
    match /quizzes/{quizId} {
      allow read: if true;
      allow create, update, delete: if request.auth.token.role == 'admin';
    }
    
    // Progress - user can read/write own
    match /progress/{progressId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
    
    // Bookmarks - user can read/write own
    match /bookmarks/{bookmarkId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## Step 6: Storage Security Rules

Replace default rules in Firebase Console **Storage → Rules**:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read access to documents
    match /documents/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.token.role == 'admin';
    }
    
    // Allow authenticated users to upload profile images
    match /profiles/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

## Step 7: Custom Claims Setup

For RBAC, set custom claims in Firebase using Admin SDK:

```javascript
admin.auth().setCustomUserClaims(uid, { role: 'admin' })
  .then(() => {
    console.log('Custom claims set for user');
  });
```

Or through Firebase Console → Users → Edit Custom Claims

## Step 8: Test Firebase Connection

In `main.dart`, Firebase is initialized:

```dart
await Firebase.initializeApp(
  options: DefaultFirebaseOptions.currentPlatform,
);
```

Run the app to test:
```bash
flutter run
```

## Troubleshooting

### "Firebase app is not initialized"
- Ensure `google-services.json` or `GoogleService-Info.plist` is in correct location
- Rebuild: `flutter clean && flutter pub get && flutter run`

### "Could not authenticate"
- Check Firestore security rules
- Verify Firebase project credentials match `firebase_options.dart`

### "Permission denied" errors
- Review Firestore security rules
- Ensure user has proper role in custom claims

## Next Steps

1. ✅ Configure Firebase in mobile app
2. Set up Firebase Admin SDK in backend for custom claims
3. Test authentication flow
4. Set up Cloud Functions for backend logic (optional)

## Resources

- [Firebase Console](https://console.firebase.google.com)
- [Flutter Firebase Docs](https://firebase.flutter.io)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
