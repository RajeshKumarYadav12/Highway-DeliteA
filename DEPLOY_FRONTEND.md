# 🚀 Deploy Frontend to Vercel - Quick Guide

Your backend is live at: **https://highway-delite-a.vercel.app/**

## ✅ Preparation Complete
- [x] Frontend `.env` updated with production backend URL
- [x] Production build created (`dist/` folder)
- [x] Ready to deploy!

---

## 🎯 Option 1: Deploy via Vercel CLI (Recommended - 2 minutes)

### Step 1: Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy from frontend folder
```bash
cd frontend
vercel --prod
```

**That's it!** Vercel will:
- Detect it's a Vite project
- Use the `dist/` folder
- Deploy to production
- Give you a live URL

---

## 🎯 Option 2: Deploy via Vercel Dashboard (3 minutes)

### Step 1: Push to GitHub
```bash
# From project root
git add .
git commit -m "Updated frontend for production"
git push origin main
```

### Step 2: Import to Vercel
1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your `Highway-DeliteA` repository
4. Click **"Import"**

### Step 3: Configure Project
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Add Environment Variable
Click **"Environment Variables"**:
- **Key**: `VITE_API_URL`
- **Value**: `https://highway-delite-a.vercel.app/api`
- **Environment**: Production, Preview, Development (check all)

### Step 5: Deploy
Click **"Deploy"** and wait ~2 minutes

---

## 🎯 Option 3: Manual Upload (If GitHub issues)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy from frontend folder
```bash
cd frontend
vercel --prod
```

Answer the prompts:
- Set up and deploy? **Y**
- Which scope? (select your account)
- Link to existing project? **N**
- Project name? **bookit-frontend** (or any name)
- Directory? **.** (current directory)
- Override settings? **N**

---

## ⚙️ Post-Deployment Configuration

### Update Backend CORS (Important!)
Once you get your frontend URL (e.g., `https://bookit-frontend.vercel.app`), update backend CORS:

1. Go to your backend deployment on Vercel
2. Add environment variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://your-frontend-url.vercel.app`

Or update `backend/server.js` CORS config:
```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://your-frontend-url.vercel.app'  // Add this
  ],
  credentials: true
};
```

---

## 🧪 Testing Your Deployed App

Once deployed, test these flows:

### 1. Browse Experiences
- Visit your frontend URL
- Check if experiences load
- Click on an experience

### 2. Complete Booking Flow
- Select a date
- Choose a time slot
- Enter details
- Apply promo code: **SAVE10**
- Complete booking
- Check confirmation page

### 3. Test Promo Codes
- **SAVE10** - 10% off (min ₹500)
- **FLAT100** - ₹100 off (min ₹1000)
- **WELCOME20** - 20% off (min ₹2000)
- **ADVENTURE50** - ₹50 off (min ₹500)

---

## 🎊 Quick Commands

### Build Frontend
```bash
cd frontend
npm run build
```

### Deploy to Vercel
```bash
cd frontend
vercel --prod
```

### Check Deployment Status
```bash
vercel ls
```

### View Deployment Logs
```bash
vercel logs <deployment-url>
```

---

## 🔧 Troubleshooting

### Issue: "API not responding"
**Solution**: Check backend logs on Vercel dashboard

### Issue: "CORS error"
**Solution**: Add frontend URL to backend CORS config

### Issue: "Images not loading"
**Solution**: Check browser console, images use Unsplash CDN

### Issue: "Build fails"
**Solution**: 
```bash
cd frontend
rm -rf node_modules dist
npm install
npm run build
```

---

## 📊 Expected Results

### Build Output
```
✓ 1424 modules transformed
dist/index.html         0.76 kB
dist/assets/index.css  18.00 kB │ gzip: 3.98 kB
dist/assets/index.js  236.08 kB │ gzip: 74.56 kB
✓ built in 4.11s
```

### Deployment
- **Build Time**: ~2-3 minutes
- **Domain**: `https://your-project.vercel.app`
- **SSL**: Automatic (HTTPS)
- **Global CDN**: Enabled

---

## 🎉 Success Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend URL configured in frontend
- [ ] CORS updated in backend
- [ ] Can browse experiences
- [ ] Can complete booking
- [ ] Promo codes work
- [ ] Images load correctly
- [ ] Mobile responsive
- [ ] All pages accessible

---

## 📱 Share Your Project

### Add to Portfolio
```markdown
**BookIt - Travel Experience Booking Platform**
- Frontend: https://your-frontend.vercel.app
- Backend: https://highway-delite-a.vercel.app
- Tech: React, TypeScript, Node.js, MongoDB
- Features: Real-time booking, promo codes, responsive design
```

### GitHub Repository
https://github.com/RajeshKumarYadav12/Highway-DeliteA

---

## 🚀 Deploy Now!

**Choose your method and deploy in 2-3 minutes!**

**Recommended**: Use Vercel CLI for fastest deployment
```bash
cd frontend
vercel --prod
```

**Your frontend is built and ready to go! 🎊**
