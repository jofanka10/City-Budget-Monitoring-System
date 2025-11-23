# RT Dues Transparency Application

## 📋 Title & Short Description

**RT Dues Transparency** - A web application that provides transparency and accountability for neighborhood association (RT) financial transactions. This application allows residents to view all financial transactions while enabling RT board members (BPH) to manage and upload transaction records with supporting documents.

## 🎯 Problem Solved (Problem Statement)

### The Problem
In many neighborhood associations (RT), there is a lack of transparency in financial management. Residents often:
- Don't know where their monthly dues are being used
- Cannot verify if their contributions are properly recorded
- Have no access to transaction history or financial reports
- Cannot see supporting documents (receipts, invoices) for expenses
- Experience distrust due to lack of financial transparency

This creates a communication gap between the RT board (BPH) and residents, leading to:
- Reduced trust in RT management
- Lower participation in community activities
- Disputes over financial matters
- Difficulty in tracking community funds

### The Impact
Without proper transparency, residents may:
- Stop paying monthly dues
- Lose trust in community leadership
- Experience conflicts within the neighborhood
- Miss opportunities for community development

## 💡 Solution Created (Solution Overview)

This application provides a **digital platform for RT financial transparency** that:

1. **For Residents:**
   - View all financial transactions (income and expenses)
   - See transaction details including amounts, descriptions, dates, and supporting documents
   - Track total income, expenses, and balance
   - Verify their contributions are recorded

2. **For RT Board (BPH):**
   - Create, update, and delete financial transactions
   - Upload supporting documents (photos, receipts, invoices)
   - Categorize transactions as income or expense
   - Maintain a complete financial record

3. **Key Features:**
   - **Authentication System**: Secure login/registration with role-based access (Resident vs BPH)
   - **Transaction Management**: Full CRUD operations for financial records
   - **File Upload**: Upload and display transaction supporting documents
   - **Financial Dashboard**: Real-time summary of income, expenses, and balance
   - **Responsive Design**: Works on both desktop and mobile devices

## 🛠️ Technology Stack & Key Features

### Backend
- **Node.js** with **Express.js** - RESTful API server
- **MongoDB** with **Mongoose** - Database for storing users and transactions
- **JWT (JSON Web Tokens)** - Secure authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - Modern UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server
- **CSS3** - Responsive styling

### Key Features Implemented
✅ User authentication (Register/Login) with JWT  
✅ Password hashing with bcrypt  
✅ Role-based access control (Resident/BPH)  
✅ Transaction CRUD operations  
✅ File/Image upload functionality  
✅ Financial dashboard with summaries  
✅ Responsive mobile and desktop design  
✅ Secure API with authentication middleware  

## 📦 Project Structure

```
RT Dues Transparency/
├── backend/
│   ├── models/
│   │   ├── User.js          # User model (Resident/BPH)
│   │   └── Transaction.js   # Transaction model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── transactions.js  # Transaction CRUD routes
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── uploads/             # Uploaded files directory
│   ├── server.js            # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx   # Navigation component
│   │   ├── pages/
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Register.jsx        # Registration page
│   │   │   ├── Dashboard.jsx       # Transaction list & summary
│   │   │   ├── TransactionForm.jsx # Add/Edit transaction
│   │   │   └── TransactionDetail.jsx # Transaction details
│   │   ├── utils/
│   │   │   └── api.js       # Axios configuration
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # React entry point
│   └── package.json
│
└── README.md
```

## 🚀 Project Boundaries (Setup Instructions)

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use MongoDB Atlas (cloud)
- **npm** or **yarn** package manager
- **Git** (optional, for version control)

### Step 1: Clone or Download the Project
If using Git:
```bash
git clone <repository-url>
cd "Vibe Coding"
```

### Step 2: Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the `backend` directory:
   ```bash
   cp .env.example .env
   ```
   
   Or manually create `.env` with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/rt-dues
   JWT_SECRET=your-secret-key-change-this-in-production
   NODE_ENV=development
   ```
   
   **Note:** If using MongoDB Atlas (cloud), replace `MONGODB_URI` with your Atlas connection string.

4. **Start MongoDB:**
   - **Local MongoDB:** Make sure MongoDB is running on your system
     ```bash
     # On macOS with Homebrew:
     brew services start mongodb-community
     
     # On Linux:
     sudo systemctl start mongod
     
     # On Windows:
     # MongoDB should start automatically as a service
     ```
   
   - **MongoDB Atlas:** No local setup needed, just use your connection string

5. **Create uploads directory:**
   ```bash
   mkdir uploads
   ```

6. **Start the backend server:**
   ```bash
   # Development mode (with auto-reload):
   npm run dev
   
   # Production mode:
   npm start
   ```
   
   You should see: `Server running on port 5000` and `MongoDB Connected`

### Step 3: Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:3000`

### Step 4: Access the Application

1. Open your browser and go to: `http://localhost:3000`

2. **Create your first account:**
   - Click "Register"
   - Fill in your details
   - Choose role: **"BPH"** (to create transactions) or **"Resident"** (to view only)
   - Click "Register"

3. **Login:**
   - Use your email and password to login

4. **Start using:**
   - **BPH users** can create transactions and upload documents
   - **Residents** can view all transactions and financial summaries

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Transactions
- `GET /api/transactions` - Get all transactions (requires auth)
- `GET /api/transactions/:id` - Get single transaction (requires auth)
- `POST /api/transactions` - Create transaction (BPH only, requires auth)
- `PUT /api/transactions/:id` - Update transaction (BPH only, requires auth)
- `DELETE /api/transactions/:id` - Delete transaction (BPH only, requires auth)

## 🔐 User Roles

- **Resident**: Can view all transactions and financial summaries
- **BPH (Board Member)**: Can create, update, delete transactions and upload files

## 🎨 Features Overview

### For Residents:
- ✅ View all financial transactions
- ✅ See transaction details with photos/documents
- ✅ View financial summary (income, expenses, balance)
- ✅ Track transaction history

### For BPH:
- ✅ Create new transactions (income/expense)
- ✅ Upload supporting documents (photos, PDFs)
- ✅ Edit existing transactions
- ✅ Delete transactions
- ✅ All resident features

## 🐛 Troubleshooting

### Backend Issues:

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running: `mongod --version`
   - Check your `MONGODB_URI` in `.env`
   - For Atlas, ensure your IP is whitelisted

2. **Port Already in Use:**
   - Change `PORT` in `.env` to a different port (e.g., 5001)
   - Or stop the process using port 5000

3. **Module Not Found:**
   - Run `npm install` again in the backend directory

### Frontend Issues:

1. **Cannot Connect to Backend:**
   - Ensure backend is running on port 5000
   - Check `vite.config.js` proxy settings
   - Or set `VITE_API_URL` environment variable

2. **CORS Errors:**
   - Ensure backend CORS is enabled (already configured)
   - Check backend is running

## 📱 Deployment (Optional)

### Frontend (Vercel/Netlify):
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to Vercel or Netlify
3. Set environment variable: `VITE_API_URL=https://your-backend-url.com/api`

### Backend (Render/Railway):
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables in the platform
4. Deploy

## 📄 License

This project is created for educational purposes.

## 👥 Author

Created as part of the Vibe Coding competition.

---

**Note:** Make sure both backend and frontend servers are running simultaneously for the application to work properly!

