# Vercel Deployment Guide - Frontend

## ✅ Build Successful!

Your frontend is now ready for deployment on Vercel. The production build is located in the `dist/` folder.

---

## 🚀 Deploy to Vercel (Method 1 - Recommended)

### Step 1: Install Vercel CLI (Optional but helpful)
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy from Frontend Directory
```bash
cd frontend
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Select your account
- **Link to existing project?** No
- **Project name?** bookit-frontend (or your choice)
- **Directory?** `./` (current directory)
- **Override settings?** No

### Step 4: Set Environment Variable
After deployment, go to your Vercel dashboard:
1. Select your project
2. Go to **Settings** → **Environment Variables**
3. Add:
   ```
   VITE_API_URL = https://your-backend-url.onrender.com/api
   ```
4. Redeploy: `vercel --prod`

---

## 🌐 Deploy via Vercel Dashboard (Method 2)

### Step 1: Push to GitHub
```bash
# From root directory
git init
git add .
git commit -m "Initial commit - BookIt application"
git branch -M main
git remote add origin https://github.com/yourusername/bookit.git
git push -u origin main
```

### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

### Step 3: Environment Variables
Add in project settings:
```
VITE_API_URL = https://your-backend-url.onrender.com/api
```

### Step 4: Deploy
Click **"Deploy"** - Done! 🎉

---

## 🔧 Important Configuration Files

### ✅ Created Files:
- `frontend/vercel.json` - Vercel configuration for SPA routing
- `frontend/dist/` - Production build folder (auto-generated)

### Package.json Scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 📋 Pre-Deployment Checklist

### Frontend (Vercel)
- [x] Build successful (`npm run build`)
- [x] `vercel.json` configured
- [x] Environment variables ready
- [ ] Backend URL known
- [ ] GitHub repository ready (if using Method 2)

### Backend (Render/Railway)
- [ ] Backend deployed first
- [ ] MongoDB connected
- [ ] Database seeded
- [ ] Backend URL noted
- [ ] CORS configured for Vercel domain

---

## 🎯 After Deployment

### 1. Update Backend CORS
In `backend/server.js`, update CORS to include your Vercel URL:
```javascript
app.use(cors({
  origin: [
    'https://your-project.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

### 2. Test Production Build Locally
```bash
cd frontend
npm run preview
```
Opens at: `http://localhost:4173`

### 3. Verify Deployment
- ✅ Homepage loads
- ✅ Can browse experiences
- ✅ Images display correctly
- ✅ Can complete booking flow
- ✅ Promo codes work
- ✅ API calls succeed (check Network tab)

---

## 🔍 Troubleshooting

### Build Fails
**Error**: Module not found
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API Not Connecting
1. Check `VITE_API_URL` is set in Vercel
2. Verify backend CORS includes Vercel domain
3. Check browser console for CORS errors

### Images Not Loading
- Already fixed! Images use `auto=format&fit=crop&q=80`
- Fallback image on error implemented

### 404 on Refresh
- Already fixed! `vercel.json` handles SPA routing

---

## 📱 Custom Domain (Optional)

### Add Custom Domain in Vercel:
1. Go to **Project Settings** → **Domains**
2. Add your domain: `yourdomain.com`
3. Update DNS records as instructed
4. SSL certificate auto-provisioned

---

## 🎉 Success URLs

After deployment, you'll have:

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **API**: `https://your-backend.onrender.com/api`

---

## 💡 Pro Tips

### Automatic Deployments
- Every push to `main` branch auto-deploys
- Preview deployments for pull requests
- Rollback to previous deployments anytime

### Performance Optimization
- Vercel Edge Network (CDN)
- Automatic HTTPS
- Image optimization built-in
- Gzip compression enabled

### Monitor Performance
- Check Vercel Analytics (free)
- Monitor API response times
- Track user engagement

---

## 📊 Build Output

Your current build:
```
✓ dist/index.html         0.76 kB │ gzip: 0.42 kB
✓ dist/assets/index.css  18.00 kB │ gzip: 3.98 kB
✓ dist/assets/index.js  236.06 kB │ gzip: 74.54 kB
✓ Built in 4.17s
```

Total bundle size: **~75KB gzipped** - Excellent! 🚀

---

## 🎬 Quick Deploy Command

```bash
cd frontend
npm run build
vercel --prod
```

That's it! Your application is now live! 🎊

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/guide/static-deploy.html
- Check `DEPLOYMENT.md` for backend deployment

**Happy Deploying! 🚀**
