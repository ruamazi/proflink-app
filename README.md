# profl.ink - Share Your Links

A modern, full-stack LinkTree alternative built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user profiles, link management, analytics, and an admin dashboard.

## Features

### User Features
- Create and customize your personal link hub
- Add, edit, delete, and reorder links
- Custom themes (background color, button colors)
- Social media links (Instagram, Twitter, YouTube, GitHub, LinkedIn, etc.)
- Public profile page with shareable URL
- Click analytics tracking
- Responsive mobile-first design

### Admin Features
- Comprehensive dashboard with statistics
- User management (view, delete, activate/deactivate)
- Admin role management (promote/demote users)
- Click analytics charts
- Top users by engagement
- Search and filter users

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt.js for password hashing
- express-validator for validation

### Frontend
- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React (icons)
- Recharts (analytics charts)
- React Hot Toast (notifications)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/linktree-clone
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

4. Start MongoDB (if using local MongoDB):
```bash
# macOS with Homebrew
brew services start mongodb-community

# Or use MongoDB Atlas for cloud database
```

5. Run the seeder to create an admin user:
```bash
npm run seed
```

Default admin credentials:
- Email: admin@linktree.com
- Password: admin123

6. Start the backend server:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Project Structure

```
linktree-clone/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── linkController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Link.js
│   │   └── Analytics.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── links.js
│   │   └── admin.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── seed.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── axios.js
    │   │   └── index.js
    │   ├── components/
    │   │   ├── Layout.jsx
    │   │   └── Navbar.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Profile.jsx
    │   │   ├── PublicProfile.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   └── NotFound.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile/:username` - Get public profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/username` - Update username

### Links
- `GET /api/links/my-links` - Get user's links
- `POST /api/links` - Create new link
- `PUT /api/links/:id` - Update link
- `DELETE /api/links/:id` - Delete link
- `PUT /api/links/reorder` - Reorder links
- `POST /api/links/:linkId/click` - Track link click

### Admin
- `GET /api/admin/stats` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user details
- `PUT /api/admin/users/:id/toggle-admin` - Toggle admin status
- `PUT /api/admin/users/:id/toggle-status` - Toggle user status
- `DELETE /api/admin/users/:id` - Delete user

## Usage

1. **Register** a new account or use the demo admin credentials
2. **Login** to access your dashboard
3. **Add links** in the dashboard to share with others
4. **Customize** your profile with themes and social links
5. **Share** your profile URL: `http://localhost:5173/u/your-username`
6. **Admin users** can access the admin dashboard to manage users and view statistics

## Demo Credentials

- **Admin**: admin@profl.ink / admin123
- **Regular User**: Create your own account

## 🚀 Deployment

Ready to deploy profl.ink to production? Check out our comprehensive deployment guide:

📖 **[DEPLOY.md](DEPLOY.md)** - Complete step-by-step deployment instructions

### Quick Deploy Summary:

1. **Backend** → [Render](https://render.com) (Free)
   - Node.js + Express API
   - Connects to MongoDB Atlas
   - Automatic deployments from GitHub

2. **Frontend** → [Vercel](https://vercel.com) (Free)
   - React + Vite application
   - Custom domain support
   - Automatic deployments from GitHub

3. **Database** → [MongoDB Atlas](https://mongodb.com) (Free tier)
   - Cloud MongoDB database
   - Already configured in your `.env`

### One-Command Setup:
```bash
./deploy.sh
```

### Environment Variables:

**Backend (.env):**
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secure-secret-key
JWT_EXPIRE=7d
ALLOWED_ORIGINS=https://profl.ink,https://www.profl.ink
```

**Frontend (.env):**
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## Features to Add

- [ ] Profile picture upload
- [ ] Link scheduling (publish at specific date/time)
- [ ] Link groups/categories
- [ ] Custom domains
- [ ] Premium subscription tiers
- [ ] More detailed analytics (location, device, referrer)
- [ ] Link password protection
- [ ] QR code generation for profiles

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.