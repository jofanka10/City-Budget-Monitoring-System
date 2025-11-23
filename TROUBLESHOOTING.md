# Troubleshooting Guide

## Error: ENOENT: no such file or directory, uv_cwd

This error occurs when npm can't find the current working directory. Here's how to fix it:

### Solution 1: Navigate to the correct directory

```bash
# Make sure you're in the correct directory
cd "/Users/jofanka/Documents/PemWeb Kelas/Vibe Coding/backend"

# Verify you're in the right place
pwd
# Should show: /Users/jofanka/Documents/PemWeb Kelas/Vibe Coding/backend

# Then run npm install
npm install
```

### Solution 2: If the directory doesn't exist

If you get an error that the directory doesn't exist:

```bash
# Check if the directory exists
ls -la "/Users/jofanka/Documents/PemWeb Kelas/Vibe Coding"

# If it doesn't exist, recreate the structure or navigate to where you saved the project
```

### Solution 3: Use absolute paths

If relative paths aren't working, use the full absolute path:

```bash
cd "/Users/jofanka/Documents/PemWeb Kelas/Vibe Coding/backend"
npm install
```

### Solution 4: Restart your terminal

Sometimes the terminal session gets corrupted:

1. Close your terminal completely
2. Open a new terminal window
3. Navigate to the project directory again
4. Try npm install

## Common Issues and Solutions

### Issue: "Cannot find module" errors
**Solution:** Make sure you ran `npm install` in the correct directory (backend or frontend)

### Issue: Port already in use
**Solution:** 
- Change the PORT in backend/.env file
- Or kill the process using the port:
  ```bash
  lsof -ti:5000 | xargs kill -9  # For backend port 5000
  lsof -ti:3000 | xargs kill -9  # For frontend port 3000
  ```

### Issue: MongoDB connection error
**Solution:**
- Make sure MongoDB is running
- Check your MONGODB_URI in backend/.env
- For local MongoDB: `mongodb://localhost:27017/rt-dues`
- For MongoDB Atlas: Use your connection string

### Issue: CORS errors in browser
**Solution:**
- Make sure backend is running
- Check that backend/.env has correct settings
- Verify frontend is pointing to correct backend URL

## Quick Fix Commands

```bash
# Backend setup (run in backend directory)
cd "/Users/jofanka/Documents/PemWeb Kelas/Vibe Coding/backend"
npm install
mkdir -p uploads
npm run dev

# Frontend setup (run in new terminal, in frontend directory)
cd "/Users/jofanka/Documents/PemWeb Kelas/Vibe Coding/frontend"
npm install
npm run dev
```

