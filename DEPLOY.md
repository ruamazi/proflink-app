# 🚀 Deployment Guide - profl.ink

Deploy your profl.ink application using **Vercel (Backend)** and **Netlify (Frontend)**.

---

## 📋 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        YOUR APP                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────────────┐         ┌──────────────────┐         │
│   │   Netlify        │         │   Vercel         │         │
│   │   (Frontend)     │◀───────▶│   (Backend)      │         │
│   │   React + Vite   │   API   │   Node.js API    │         │
│   │                  │  Calls  │                  │         │
│   └──────────────────┘         └────────┬─────────┘         │
│                                          │                   │
│                                          ▼                   │
│                              ┌──────────────────┐           │
│                              │   MongoDB Atlas  │           │
│                              │   (Database)     │           │
│                              └──────────────────┘           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Prerequisites

1. **GitHub Account** (free)
2. **Vercel Account** (free) - for backend
3. **Netlify Account** (free) - for frontend
4. **MongoDB Atlas** (free tier) - already configured ✓

---

## Step 1: Prepare Your Code for Deployment

### 1.1 Create a New GitHub Repository

```bash
cd /Users/a./Documents/code/opencode/react/blog-app/linktree-clone

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ready for deployment"

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/proflink.git
git branch -M main
git push -u origin main
```

**Note:** Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 2: Deploy Backend to Vercel

### 2.1 Sign Up & Install Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login
```

### 2.2 Deploy Backend

```bash
# Navigate to project root
cd /Users/a./Documents/code/opencode/react/blog-app/linktree-clone

# Deploy to Vercel
vercel
```

**Vercel CLI will ask:**
- **Set up and deploy?** → Yes
- **Which scope?** → Select your username
- **Link to existing project?** → No
- **What's your project name?** → `proflink-api` (or any name)
- **Which directory is your code located?** → `./` (root)

### 2.3 Add Environment Variables on Vercel

Go to https://vercel.com/dashboard → Select your project → Settings → Environment Variables

Add these variables:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://mohssin:mohssin@cluster0.jdw6cl6.mongodb.net/opencode-linktree-clone?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRE=7d
```

⚠️ **Important:** 
- Change `JWT_SECRET` to a secure random string (min 32 characters)
- Keep your MongoDB URI secure

### 2.4 Redeploy with Environment Variables

```bash
vercel --prod
```

### 2.5 Get Your Backend URL

After deployment, Vercel will provide a URL like:
```
https://proflink-api.vercel.app
```

**Copy this URL** - you'll need it for the frontend.

Test it: Open `https://proflink-api.vercel.app/api/health` in your browser

---

## Step 3: Deploy Frontend to Netlify

### 3.1 Sign Up & Install Netlify CLI

```bash
# Install Netlify CLI globally
npm i -g netlify-cli

# Login to Netlify
netlify login
```

### 3.2 Update Frontend Environment Variable

Edit `frontend/.env.production` (create if doesn't exist):

```bash
cd frontend
echo "VITE_API_URL=https://proflink-api.vercel.app/api" > .env.production
```

**Replace** `proflink-api.vercel.app` with your actual Vercel backend URL.

### 3.3 Build Frontend Locally (Optional Test)

```bash
cd frontend
npm run build
```

If this succeeds, you're ready to deploy!

### 3.4 Deploy to Netlify

```bash
# From the frontend directory
cd /Users/a./Documents/code/opencode/react/blog-app/linktree-clone/frontend

# Deploy to Netlify
netlify deploy
```

**Netlify CLI will ask:**
- **Create & configure a new site?** → Yes
- **Team:** → Select your team (usually your username)
- **Site name:** → `proflink-app` (or any unique name)
- **Publish directory:** → `dist`

### 3.5 Deploy to Production

```bash
netlify deploy --prod
```

### 3.6 Get Your Frontend URL

Netlify will provide a URL like:
```
https://proflink-app.netlify.app
```

---

## Step 4: Update CORS (If Needed)

If you get CORS errors, update `backend/server.js`:

```javascript
// Update the CORS section in backend/server.js
app.use(cors({
  origin: [
    'http://localhost:5173',  // Local development
    'https://proflink-app.netlify.app',  // Your Netlify URL
    'https://your-custom-domain.com'  // If you add one later
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

Then redeploy backend:
```bash
cd /Users/a./Documents/code/opencode/react/blog-app/linktree-clone
vercel --prod
```

---

## 🧪 Testing Your Deployment

### Test Backend:
```
https://proflink-api.vercel.app/api/health
```
Should return: `{"status":"OK","message":"Server is running"}`

### Test Frontend:
Open your Netlify URL:
```
https://proflink-app.netlify.app
```

### Test Complete Flow:
1. ✅ Register a new account
2. ✅ Login
3. ✅ Create links in dashboard
4. ✅ View public profile
5. ✅ Test admin dashboard (use admin credentials)

---

## 🔄 Making Updates

### Update Backend:
```bash
cd /Users/a./Documents/code/opencode/react/blog-app/linktree-clone
git add .
git commit -m "Backend updates"
git push origin main
vercel --prod
```

### Update Frontend:
```bash
cd /Users/a./Documents/code/opencode/react/blog-app/linktree-clone/frontend
npm run build
netlify deploy --prod
```

---

## 🔧 Troubleshooting

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Add your Netlify URL to backend CORS origins

### Build Fails
**Solution:** 
1. Check `npm run build` works locally
2. Check environment variables are set
3. Check Vercel/Netlify logs

### MongoDB Connection Fails
**Solution:**
1. Verify `MONGODB_URI` is correct
2. Whitelist all IPs in MongoDB Atlas Network Access: `0.0.0.0/0`
3. Check Vercel function logs

### Frontend Can't Connect to Backend
**Solution:**
1. Check `VITE_API_URL` points to your Vercel backend
2. Ensure URL ends with `/api`
3. Check browser console for errors

### 404 Errors on Frontend Routes
**Solution:** Netlify `netlify.toml` is already configured with redirects

---

## 📊 Environment Variables Summary

### Backend (Vercel):
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-super-secret-key-min-32-characters-long
JWT_EXPIRE=7d
```

### Frontend (Netlify):
```
VITE_API_URL=https://proflink-api.vercel.app/api
```

**To add env vars in Netlify:**
Site settings → Build & deploy → Environment → Environment variables

---

## 🆓 Free Tier Limits

### Vercel (Hobby/Free):
- ✅ Unlimited static sites
- ✅ Serverless Functions: 100GB-hours/month
- ✅ Bandwidth: 100GB/month
- ✅ Build time: 6,000 minutes/month

### Netlify (Starter/Free):
- ✅ Unlimited static sites
- ✅ Bandwidth: 100GB/month
- ✅ Build time: 300 minutes/month
- ✅ Forms: 100 submissions/month

### MongoDB Atlas (M0 - Free):
- ✅ 512MB storage
- ✅ Shared RAM
- ✅ Always-on (for active apps)

---

## 📝 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Vercel
- [ ] Environment variables set on Vercel
- [ ] Frontend deployed to Netlify
- [ ] Environment variables set on Netlify
- [ ] CORS configured correctly
- [ ] Registration works
- [ ] Login works
- [ ] Creating links works
- [ ] Public profiles load
- [ ] Admin dashboard accessible

---

## 🎉 Success!

Your profl.ink app is now live!

- **Frontend**: https://proflink-app.netlify.app
- **Backend**: https://proflink-api.vercel.app

Share your links with the world! 🚀

---

## 💡 Next Steps

1. **Test everything thoroughly**
2. **Set up a custom domain later** (optional)
3. **Monitor usage** on Vercel/Netlify dashboards
4. **Set up analytics** if needed

Need help? Check the logs in Vercel/Netlify dashboards!