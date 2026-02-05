# Deploy profl.ink to Netlify

## Prerequisites
- GitHub repository with your code pushed
- Netlify account (free)

## Deployment Steps

### 1. Connect Repository
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Select GitHub as your Git provider
4. Choose your `linktree-clone` repository

### 2. Configure Build Settings
Netlify will auto-detect these settings:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Base directory:** `frontend`

If not auto-detected, set them manually in the deploy settings.

### 3. Set Environment Variables
In Netlify dashboard → Site settings → Environment variables:

Add:
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

Replace with your actual Vercel backend URL.

### 4. Deploy
Click "Deploy site"

Netlify will:
- Clone your repository
- Install dependencies
- Build the frontend
- Deploy to global CDN

### 5. Update Backend CORS
After deployment, update your backend CORS settings to allow your Netlify URL.

### Live URL
Your site will be available at:
`https://your-site-name.netlify.app`

---

## Troubleshooting

**Build fails?**
- Check that `netlify.toml` is in the root of your repository
- Verify `VITE_API_URL` is set correctly
- Check build logs in Netlify dashboard

**Page not found errors?**
- The `netlify.toml` redirect rules handle React Router SPA routing
- Make sure the file is committed to GitHub

**API not working?**
- Verify `VITE_API_URL` environment variable is set
- Check that your backend CORS allows the Netlify domain
- Test backend health endpoint: `/api/health`