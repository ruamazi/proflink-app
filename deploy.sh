#!/bin/bash

echo "🚀 profl.ink Deployment Helper"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - profl.ink ready for deployment"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already initialized"
fi

echo ""
echo "📋 Pre-deployment Checklist:"
echo ""
echo "1. ✅ Code is ready"
echo "2. ⏳ Create GitHub repository"
echo "3. ⏳ Push code to GitHub"
echo "4. ⏳ Deploy backend to Render"
echo "5. ⏳ Deploy frontend to Vercel"
echo ""
echo "📖 Next Steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo ""
echo "2. Push your code:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/proflink.git"
echo "   git push -u origin main"
echo ""
echo "3. Follow the detailed guide in DEPLOY.md"
echo ""
echo "🔗 Quick Links:"
echo "   Render: https://render.com"
echo "   Vercel: https://vercel.com"
echo ""
echo "📚 Read DEPLOY.md for complete instructions!"
echo ""