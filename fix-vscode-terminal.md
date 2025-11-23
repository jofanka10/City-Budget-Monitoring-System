# Fix VSCode Terminal Error: ENOENT: uv_cwd

## The Problem
VSCode terminal shows `ENOENT: uv_cwd` error because the terminal's current working directory is corrupted or doesn't exist.

## Solution 1: Close and Reopen Terminal (Easiest)

1. **Close the current terminal in VSCode:**
   - Click the trash icon on the terminal tab
   - Or press `Cmd + W` (Mac) / `Ctrl + W` (Windows/Linux)

2. **Open a new terminal:**
   - Press `` Ctrl + ` `` (backtick) to open new terminal
   - Or go to Terminal → New Terminal

3. **Navigate to the correct directory:**
   ```bash
   cd "/Users/jofanka/Documents/PemWeb Kelas/Vibe Coding/backend"
   npm install
   ```

## Solution 2: Use Absolute Paths

Instead of using relative paths, always use the full absolute path:

```bash
# For Backend
cd "/Users/jofanka/Documents/PemWeb Kelas/Vibe Coding/backend"
npm install

# For Frontend (in new terminal)
cd "/Users/jofanka/Documents/PemWeb Kelas/Vibe Coding/frontend"
npm install
```

## Solution 3: Run Commands from Project Root

Navigate to project root first, then use relative paths:

```bash
# Go to project root
cd "/Users/jofanka/Documents/PemWeb Kelas/Vibe Coding"

# Then navigate to subdirectories
cd backend
npm install

# Or for frontend
cd ../frontend
npm install
```

## Solution 4: Use the Setup Script

Run the setup script from the project root:

```bash
cd "/Users/jofanka/Documents/PemWeb Kelas/Vibe Coding"
./setup.sh
```

## Solution 5: Verify Directory Exists First

Before running npm, verify you're in the right place:

```bash
# Check current directory
pwd

# List files to verify
ls -la

# If you see package.json, you're in the right place
# Then run npm install
npm install
```

## Quick Commands to Copy-Paste

### Backend Setup:
```bash
cd "/Users/jofanka/Documents/PemWeb Kelas/Vibe Coding/backend" && npm install && npm run dev
```

### Frontend Setup:
```bash
cd "/Users/jofanka/Documents/PemWeb Kelas/Vibe Coding/frontend" && npm install && npm run dev
```

## Why This Happens

- The terminal's working directory was deleted or moved
- VSCode terminal session got corrupted
- Path with spaces can sometimes cause issues
- Terminal was opened before the directory existed

## Prevention

Always:
1. Open terminal AFTER opening the project folder in VSCode
2. Use absolute paths when in doubt
3. Verify directory exists with `pwd` and `ls` before running commands

