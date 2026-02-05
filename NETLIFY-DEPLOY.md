# 🚀 Netlify Website Deployment Guide

Deploy your profl.ink frontend to Netlify using their website interface (no CLI required!).

---

## 📋 Prerequisites Checklist

- [ ] Frontend built successfully ✓ (Your build is ready!)
- [ ] GitHub repository created
- [ ] Netlify account (free)
- [ ] Built files in `frontend/dist/` ✓

---

## 🎯 Step-by-Step Netlify Website Deployment

### Step 1: Sign Up/Login to Netlify

1. Go to **https://app.netlify.com**
2. Click **"Sign up"** (if you don't have an account) or **"Log in"**
3. **Sign up options:**
   - GitHub (recommended)
   - GitLab
   - Bitbucket
   - Email
4. **Choose GitHub** to connect your repository

### Step 2: Connect Your GitHub Repository

1. After login, you'll see **"Sites"** in the left sidebar
2. Click **"Add new site"** or **"Add an existing site"**
3. Choose **"Git"** as the deployment method
4. **Connect to Git provider:** Select **GitHub**
5. **Authorize Netlify:** Click "Authorize Netlify" and grant permissions
6. **Select repository:** Choose your `proflink` repository from the dropdown

### Step 3: Configure Build Settings

**If this is your first time deploying:**
- Netlify will automatically detect it's a React/Vite project
- **Build command:** `npm run build`
- **Publish directory:** `dist`

**If you need to configure manually:**
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** `18` (or leave blank)
- **Environment variables:** Click "Show advanced" and add:
  ```
  VITE_API_URL=https://YOUR_BACKEND_URL.vercel.app/api
  ```

### Step 4: Deploy!

1. Click **"Deploy site"**
2. Netlify will:
   - Clone your repository
   - Run `npm install`
   - Run `npm run build`
   - Deploy the `dist` folder
3. Wait for the deployment to complete

---

## ⚡ After Deployment

### What You'll Get:
- **Live URL:** `https://your-site-name.netlify.app`
- **Deployment logs:** Full build output visible
- **Automatic HTTPS:** SSL certificate included
- **Custom domain:** You can add your `.ink` domain later
- **Rollback options:** Instant rollbacks to previous deployments

### Test Your Live Site:
1. Visit your Netlify URL
2. Test user registration
3. Test login functionality
4. Test link creation
5. Test public profile pages: `/u/username`
6. Test admin dashboard (if admin user)

---

## 🔧 Important Configuration Notes

### Environment Variables:
- **Must add `VITE_API_URL`** to point to your backend
- Example: `https://proflink-api.vercel.app/api`
- This connects your frontend to your Vercel backend

### Build Issues?
If build fails, check:
1. Your `package.json` has correct build script
2. All dependencies are installed
3. Node version compatibility (Node.js 16+ recommended)

### Domain Setup (Optional):
1. In Netlify dashboard → Site settings → Domain management
2. Add your custom domain (e.g., `profl.ink`)
3. Update DNS settings as per Netlify instructions
4. Enable HTTPS (automatic)

---

## 🌍 Update Your Backend CORS

After your frontend is live, update your backend CORS in `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-site-name.netlify.app',  // Your Netlify frontend
    'https://profl.ink'  // Your custom domain
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

Then redeploy your backend to Vercel:
```bash
cd backend
git add .
git commit -m "Update CORS for Netlify"
git push origin main
vercel --prod
```

---

## 🔄 Continuous Deployment

### Automatic Deployments:
Every time you push to your `main` branch on GitHub, Netlify will:
1. Automatically trigger a new build
2. Deploy if the build is successful
3. Rollback if there's an issue

### To Disable Auto-Deploy:
1. Go to Netlify dashboard
2. Site settings → Build & deploy → Edit settings
3. Uncheck "Automatic deployments"

---

## 📊 Netlify Features You Get (Free Tier)

✅ **Bandwidth:** 100GB per month
✅ **Build time:** 300 minutes per month  
✅ **Forms:** 100 submissions per month
✅ **Serverless Functions:** 100GB-hours per month
✅ **HTTP/2:** Supported
✅ **SSL:** Automatic HTTPS certificates
✅ **Edge network:** Global CDN
✅ **Rollbacks:** Instant rollbacks
✅ **Split testing:** Deploy previews
✅ **Analytics:** Basic site analytics

---

## 🎯 Success!

Once deployed, your profl.ink app will be live at:
```
https://your-site-name.netlify.app
```

Share this link with the world! 🚀

---

## 💡 Pro Tips

1. **Use environment variables** for API URLs
2. **Enable password protection** for development sites
3. **Set up custom domains** for professional appearance
4. **Monitor build logs** for troubleshooting
5. **Use deploy previews** for testing changes

Need help? Check Netlify's documentation or ask for assistance! 📚