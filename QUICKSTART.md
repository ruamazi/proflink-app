# Quick Start Guide

## Installation

Run this command in the root directory to install all dependencies:

```bash
npm run install:all
```

Or manually install each:
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

## Setup Environment Variables

### Backend
1. Copy `.env` in `/backend` directory (already provided)
2. Update `MONGODB_URI` if needed
3. Change `JWT_SECRET` for production

### Frontend
1. Copy `.env.example` to `.env` in `/frontend` directory
2. Update `VITE_API_URL` if your backend runs on different port

## Start MongoDB

Make sure MongoDB is running:

```bash
# macOS with Homebrew
brew services start mongodb-community

# Or use MongoDB Atlas (cloud) - update MONGODB_URI accordingly
```

## Seed Admin User

Create the default admin user:

```bash
npm run seed
```

## Run the Application

Start both backend and frontend simultaneously:

```bash
npm run dev
```

Or start separately:
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

## Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## Demo Credentials

- **Admin Account**: 
  - Email: admin@linktree.com
  - Password: admin123

## Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Use MongoDB Atlas or managed MongoDB
4. Deploy to Render, Railway, Heroku, or VPS

### Frontend
1. Update `VITE_API_URL` to production backend URL
2. Run `npm run build` in frontend directory
3. Deploy `dist` folder to Vercel, Netlify, or similar

## Project Structure

```
linktree-clone/
├── backend/          # Express.js API
│   ├── config/       # Database config
│   ├── controllers/  # Route controllers
│   ├── middleware/   # Auth middleware
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   └── utils/        # JWT & seed utilities
├── frontend/         # React + Vite app
│   ├── src/
│   │   ├── api/      # API functions
│   │   ├── components/  # Reusable components
│   │   ├── context/  # Auth context
│   │   └── pages/    # Page components
└── README.md         # Full documentation
```

## Troubleshooting

### Port already in use
- Backend: Change `PORT` in backend `.env`
- Frontend: Vite will automatically find next available port

### MongoDB connection failed
- Check if MongoDB is running
- Verify `MONGODB_URI` in backend `.env`
- For MongoDB Atlas, whitelist your IP address

### CORS errors
- Backend CORS is configured to allow all origins in development
- For production, update CORS settings in `server.js`

## Features Included

✅ User authentication (JWT)
✅ User registration & login
✅ Profile customization (themes, colors)
✅ Link management (CRUD operations)
✅ Social media links
✅ Public profile pages
✅ Click analytics tracking
✅ Admin dashboard
✅ User management (admin can delete/promote users)
✅ Statistics & charts
✅ Responsive design (Tailwind CSS)
✅ Modern UI with animations