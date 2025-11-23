#!/bin/bash

# Frontend Installation Script
# This script installs frontend dependencies

PROJECT_ROOT="/Users/jofanka/Documents/PemWeb Kelas/Vibe Coding"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

echo "📦 Installing Frontend Dependencies..."
echo "======================================"

# Navigate to frontend directory
cd "$FRONTEND_DIR" || {
    echo "❌ Error: Cannot access frontend directory"
    echo "Path: $FRONTEND_DIR"
    exit 1
}

# Verify we're in the right place
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in $FRONTEND_DIR"
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
    echo "✅ Frontend dependencies installed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Start dev server: npm run dev"
    echo "2. Open http://localhost:3000 in browser"
else
    echo ""
    echo "❌ Installation failed!"
    exit 1
fi

