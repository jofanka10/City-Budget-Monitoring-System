# Quick Setup Guide

## 🚀 Step-by-Step Setup Instructions

### Prerequisites Check
Make sure you have:
- ✅ Node.js installed (v16+)
- ✅ MongoDB installed and running (or MongoDB Atlas account)

### Step 1: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example or create manually)
# For local MongoDB:
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/rt-dues
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development" > .env

# Create uploads directory
mkdir uploads

# Start MongoDB (if using local MongoDB)
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Windows: MongoDB should start automatically

# Start backend server
npm run dev
```

**Expected output:** 
- ✅ Server running on port 5000
- ✅ MongoDB Connected

### Step 2: Frontend Setup (New Terminal)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start frontend server
npm run dev
```

**Expected output:**
- ✅ Frontend running on http://localhost:3000

### Step 3: Access Application

1. Open browser: `http://localhost:3000`
2. Register a new account
3. Choose role: **BPH** (to create transactions) or **Resident** (to view)
4. Start using the application!

## 🎯 First Steps After Setup

1. **Register as BPH:**
   - Email: admin@rt.com
   - Password: (your choice, min 6 characters)
   - Role: BPH

2. **Create First Transaction:**
   - Click "Add Transaction"
   - Fill in name, description, amount
   - Upload a photo/receipt (optional)
   - Save

3. **Register as Resident:**
   - Create another account with role "Resident"
   - View all transactions on dashboard

## ⚠️ Common Issues

**Backend won't start:**
- Check if MongoDB is running
- Verify .env file exists
- Check if port 5000 is available

**Frontend can't connect:**
- Ensure backend is running
- Check browser console for errors
- Verify proxy settings in vite.config.js

**File upload not working:**
- Check uploads/ directory exists
- Verify file size (max 5MB)
- Check file type (images or PDF only)

## 📞 Need Help?

Check the main README.md for detailed documentation.

