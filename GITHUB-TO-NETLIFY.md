# 🚀 GitHub to Netlify Deployment Guide

Deploy your profl.ink frontend from GitHub directly to Netlify.

---

## 📋 Prerequisites

### Required:
- ✅ **GitHub Repository** - Already created
- ✅ **Frontend Built** - Already completed  
- ✅ **Netlify Account** - Need to create (free)

---

## 🎯 Step-by-Step Deployment

### Step 1: Create Netlify Account

1. Go to **https://app.netlify.com**
2. Click **"Sign up"** (free)
3. Choose **GitHub** as your Git provider
4. Authorize Netlify to access your GitHub account

### Step 2: Deploy from GitHub Repository

1. In Netlify dashboard, click **"Add new site"**
2. Choose **"Import an existing project"**
3. Select **"GitHub"** as your Git provider
4. **Repository URL:** Your GitHub repo URL:
   ```
   https://github.com/YOUR_USERNAME/proflink
   ```
5. **Install command:** Leave default (`npm ci install`)
6. **Build command:** Leave default (`npm run build`)
7. **Publish directory:** `dist`

### Step 3: Deploy!

1. **"Deploy site"** - Netlify will:
   - Clone your repository
   - Install dependencies
   - Build the project
   - Deploy to Netlify CDN

---

## 🔧 Configuration Files (Already Ready)

### `frontend/netlify.toml` ✅
```
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Admin routes
[[redirects]]
  from = "/admin/*"
  to = "/index.html"
  status = 200

# Dashboard routes  
[[redirects]]
  from = "/dashboard/*"
  to = "/index.html"
  status = 200

# Profile routes
[[redirects]]
  from = "/profile/*"
  to = "/index.html"
  status = 200

# Auth routes
[[redirects]]
  from = "/login"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/register"
  to = "/index.html"
  status = 200

# User profile routes
[[redirects]]
  from = "/u/*"
  to = "/index.html"
  status = 200

# API routes (404)
[[redirects]]
  from = "/api/*"
  to = "/index.html"
  status = 404

# Asset routes (404)
[[redirects]]
  from = "/assets/*"
  to = "/index.html"
  status = 404
```

---

## 📊 Environment Variables to Set (Netlify)

**In Netlify Dashboard:**
- Site settings → Build & deploy → Environment variables
- Add: `VITE_API_URL`
- Value: Your Vercel backend URL + `/api`
- Example: `https://proflink-api.vercel.app/api`

---

## 🚀 Expected Result

### What You'll Get:
- **URL:** `https://your-project-name.netlify.app`
- **Automatic deployments** on push to GitHub
- **HTTPS** and **SSL** included
- **CDN** for fast static delivery
- **Rollbacks** for quick recovery

### After Deployment:
1. Update your backend CORS to allow your Netlify URL
2. Test the complete application
3. Your site will be live and functional!

---

## 🔄 Workflow Benefits

### Automatic Deployment:
- **Push to GitHub** → Netlify auto-deploys
- **GitHub Actions** (if configured) → Even better automation

### Manual Updates:
- **Push changes** → Netlify triggers new deployment
- **Branch deploys** → Test different versions

---

## 🎯 Quick Commands

### If you need to redeplog:
```bash
# Remove previous build (if needed)
rm -rf frontend/dist
npm run build

# Force redeploy on Netlify
# (No direct CLI needed - Netlify will detect Git changes)
```

---

## 📝 Success!

Your profl.ink will be automatically deployed from GitHub to Netlify with every push!

**Your configuration is already perfect for Git + Netlify deployment!** 🚀

---

## 💡 **Alternative: One-Click Netlify App**

If you prefer even simpler deployment:

1. Install **Netlify desktop app**
2. Connect your GitHub repository
3. Right-click your repo → "Deploy with Netlify"

**This gives you:**
- 🖱️ **Visual interface** (no CLI needed)
- 🔃 **Automatic deploys**
- 📊 **Deploy previews**
- 🧰 **Environment management** (GUI)
- 📱 **One-click rollbacks**

**Choose whichever method fits your workflow!** ✨