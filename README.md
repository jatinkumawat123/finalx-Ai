[README.md](https://github.com/user-attachments/files/26780744/README.md)
# 🚀 FinalX.AI — Ask Anything. Build Everything.

> **The ultimate all-in-one AI platform for Indian students, creators, and entrepreneurs.**
> Built by **Jatin Kumawat**

---

## ✨ Features

| Module | Description |
|--------|-------------|
| 🤖 AI Chat | ChatGPT-like multi-purpose assistant |
| 📚 Study Helper | Notes, Q&A solver, exam prep |
| ✨ Content Creator | Instagram, YouTube, Facebook content |
| 💻 Code Builder | HTML/CSS/JS generator, games, websites |
| 🔮 Astrology & Wellness | Rashi predictions, yoga, psychology tips |
| 💼 Business & Income | Income ideas, stock market basics |

---

## 🗂 Project Structure

```
finalx-ai/
├── frontend/          # React.js app (deploy to Vercel)
│   ├── src/
│   │   ├── pages/     # All pages (Home, Dashboard, etc.)
│   │   ├── components/ # Navbar, Footer, ProtectedRoute
│   │   ├── context/   # AuthContext (JWT)
│   │   └── styles/    # Global CSS (dark premium theme)
│   └── vercel.json    # Vercel config
│
└── backend/           # Node.js + Express (deploy to Render)
    ├── server.js      # Main server
    ├── models/        # MongoDB schemas
    ├── routes/        # auth, ai, payment, user
    ├── middleware/    # JWT auth middleware
    └── render.yaml    # Render deployment config
```

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone & Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
# Backend runs on http://localhost:5000
```

### 2. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if needed
npm start
# Frontend runs on http://localhost:3000
```

---

## 🔑 Environment Variables

### Backend `.env`

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/finalxai
JWT_SECRET=your_super_secret_jwt_key_minimum_32_chars
FRONTEND_URL=http://localhost:3000

# Optional — for real AI responses (demo mode works without it)
OPENAI_API_KEY=sk-your-openai-api-key

# Optional — for real payments (demo mode works without it)
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Frontend `.env`

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🚀 Free Deployment Guide

### Step 1: MongoDB Atlas (Free Database)
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free M0 cluster
3. Get connection string → paste as `MONGODB_URI`

### Step 2: Deploy Backend to Render (Free)
1. Push backend to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo, select `/backend` folder
4. Set environment variables from `.env`
5. Deploy → copy your backend URL (e.g., `https://finalx-ai.onrender.com`)

### Step 3: Deploy Frontend to Vercel (Free)
1. Push frontend to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import repo, set root to `/frontend`
4. Add env var: `REACT_APP_API_URL=https://your-backend.onrender.com/api`
5. Deploy → your app is live! 🎉

---

## 💳 Payment Plans

| Plan | Price | Duration |
|------|-------|----------|
| Free Trial | ₹0 | 3 days |
| Basic | ₹2 | 2 days |
| Premium | ₹9 | 30 days |

> Payments via Razorpay — UPI, Cards, Net Banking supported

---

## 🔐 Security Features

- ✅ JWT authentication (7-day tokens)
- ✅ bcrypt password hashing (12 rounds)
- ✅ Helmet.js security headers
- ✅ Rate limiting (100 req/15min)
- ✅ Input validation (express-validator)
- ✅ CORS protection
- ✅ XSS protection via React

---

## 🛠 Tech Stack

**Frontend:** React.js 18, React Router v6, Axios, React Markdown, React Hot Toast, Lucide Icons

**Backend:** Node.js, Express.js, Mongoose, JWT, bcryptjs, Razorpay SDK, Helmet, express-rate-limit

**Database:** MongoDB Atlas

**Deployment:** Vercel (frontend) + Render (backend) + MongoDB Atlas

---

## 🌟 API Endpoints

```
POST /api/auth/register    - Create account (starts 3-day trial)
POST /api/auth/login       - Login
GET  /api/auth/me          - Get current user

POST /api/ai/chat          - Send AI message (all modules)
GET  /api/ai/history       - Get chat history

POST /api/payment/create-order  - Create Razorpay order
POST /api/payment/verify        - Verify & activate subscription
GET  /api/payment/plans         - Get available plans

GET  /api/user/profile     - Get profile
PUT  /api/user/profile     - Update profile
PUT  /api/user/password    - Change password
DELETE /api/user/history   - Clear chat history
```

---

## 👨‍💻 Created By

**Jatin Kumawat** — Full Stack Developer & AI Enthusiast from Rajasthan, India 🇮🇳

---

## 📄 License

MIT License — Free to use and modify for personal and commercial projects.

---

*FinalX.AI — Ask Anything. Build Everything.*
