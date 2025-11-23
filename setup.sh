#!/bin/bash

# RT Dues Transparency - Setup Script
# This script helps set up the project

echo "🚀 RT Dues Transparency - Setup Script"
echo "======================================"
echo ""

# Get the project root directory
PROJECT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

echo "Project root: $PROJECT_ROOT"
echo ""

# Check if directories exist
if [ ! -d "$BACKEND_DIR" ]; then
    echo "❌ Backend directory not found!"
    exit 1
fi

if [ ! -d "$FRONTEND_DIR" ]; then
    echo "❌ Frontend directory not found!"
    exit 1
fi

# Setup Backend
echo "📦 Setting up Backend..."
echo "------------------------"
cd "$BACKEND_DIR"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "Backend dependencies already installed."
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rt-dues
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
EOF
    echo "✅ .env file created. Please update MONGODB_URI if using MongoDB Atlas."
else
    echo "✅ .env file already exists."
fi

# Create uploads directory
if [ ! -d "uploads" ]; then
    echo "Creating uploads directory..."
    mkdir -p uploads
    echo "✅ Uploads directory created."
else
    echo "✅ Uploads directory already exists."
fi

echo ""
echo "📦 Setting up Frontend..."
echo "-------------------------"
cd "$FRONTEND_DIR"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "Frontend dependencies already installed."
fi

echo ""
echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Make sure MongoDB is running"
echo "2. Start backend: cd backend && npm run dev"
echo "3. Start frontend: cd frontend && npm run dev"
echo "4. Open http://localhost:3000 in your browser"
echo ""

