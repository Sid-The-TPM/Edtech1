#!/bin/bash
# EduTech Learning Platform - Setup Script
# This script automates the setup process

set -e

echo "🚀 EduTech Learning Platform - Setup Guide"
echo "==========================================="
echo ""

# Step 1: Check Prerequisites
echo "📋 Checking prerequisites..."
command -v node &> /dev/null && echo "✅ Node.js installed" || echo "❌ Node.js not found"
command -v npm &> /dev/null && echo "✅ npm installed" || echo "❌ npm not found"
command -v flutter &> /dev/null && echo "✅ Flutter installed" || echo "❌ Flutter not found"
command -v docker &> /dev/null && echo "✅ Docker installed" || echo "❌ Docker not found"
echo ""

# Step 2: Backend Setup
echo "🔧 Setting up backend..."
cd backend-api
echo "📦 Installing backend dependencies..."
npm install
echo "✅ Backend dependencies installed"
cd ..
echo ""

# Step 3: Mobile Setup
echo "📱 Setting up mobile app..."
cd mobile-app
echo "📦 Getting Flutter dependencies..."
flutter pub get
echo "✅ Mobile dependencies installed"
cd ..
echo ""

# Step 4: Docker Compose
echo "🐳 Starting Docker services..."
docker-compose up -d
echo "✅ Docker services started"
echo ""

# Step 5: Summary
echo "✨ Setup Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Update Firebase credentials:"
echo "   Edit: mobile-app/lib/firebase_options.dart"
echo ""
echo "2. Start backend server:"
echo "   cd backend-api && npm run start:dev"
echo ""
echo "3. Start mobile app:"
echo "   cd mobile-app && flutter run"
echo ""
echo "4. Access API documentation:"
echo "   http://localhost:3000/api/docs"
echo ""
echo "📚 For more information, see docs/"
