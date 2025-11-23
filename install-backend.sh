#!/bin/bash

# Backend Installation Script
# This script installs backend dependencies

PROJECT_ROOT="/Users/jofanka/Documents/PemWeb Kelas/Vibe Coding"
BACKEND_DIR="$PROJECT_ROOT/backend"

echo "📦 Installing Backend Dependencies..."
echo "======================================"

# Navigate to backend directory
cd "$BACKEND_DIR" || {
    echo "❌ Error: Cannot access backend directory"
    echo "Path: $BACKEND_DIR"
    exit 1
}

# Verify we're in the right place
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in $BACKEND_DIR"
    exit 1
fi

echo "✅ Found package.json"
echo "Current directory: $(pwd)"
echo ""

# Install dependencies
echo "Running npm install..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Backend dependencies installed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Create .env file (if not exists)"
    echo "2. Create uploads directory: mkdir -p uploads"
    echo "3. Start server: npm run dev"
else
    echo ""
    echo "❌ Installation failed!"
    exit 1
fi

