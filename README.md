# profl.ink - Share Your Links

A modern, full-stack LinkTree alternative built with the MERN stack featuring user profiles, link management, analytics, and an admin dashboard.

## Features

### User Features
- Create and customize your personal link hub
- Add, edit, delete, and reorder links
- Custom themes (background color, button colors)
- Social media links (Instagram, Twitter, YouTube, GitHub, LinkedIn, etc.)
- Public profile page with shareable URL
- Click analytics tracking
- Multi-language support (English, Spanish, Arabic)

### Admin Features
- Comprehensive dashboard with statistics
- User management (view, delete, activate/deactivate)
- Admin role management
- Click analytics charts

## Tech Stack

### Backend
- Node.js, Express.js, MongoDB with Mongoose
- JWT Authentication, bcrypt.js

### Frontend
- React 18, Vite, Tailwind CSS
- React Router DOM, Axios

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account

### Installation

**Backend:**
```bash
cd backend
npm install
npm run seed  # Creates admin user
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Demo Credentials

- **Admin**: admin@profl.ink / admin123

## Deployment

See [NETLIFY-DEPLOY.md](NETLIFY-DEPLOY.md) for deployment instructions.