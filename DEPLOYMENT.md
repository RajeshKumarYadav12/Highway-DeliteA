# Deployment Guide - BookIt Application

This guide explains how to deploy both backend and frontend to cloud platforms.

## 🚀 Quick Deployment Overview

- **Backend**: Deploy to Render, Railway, or Heroku
- **Frontend**: Deploy to Vercel, Netlify, or AWS Amplify
- **Database**: MongoDB Atlas (already configured)

---

## Backend Deployment

### Option 1: Render (Recommended - Free Tier Available)

#### Steps:

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository and branch

3. **Configure Service**
   ```
   Name: bookit-backend
   Region: Choose closest to your users
   Branch: main
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   ```
   MONGO_URI=mongodb+srv://yrajeshkumar799:3S2JRJQPog4EGsOA@cluster0.rp5sr.mongodb.net/TaskC
   PORT=5000
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (usually 2-3 minutes)
   - Note your backend URL: `https://bookit-backend.onrender.com`

6. **Seed Database (One-time)**
   - In Render dashboard, go to Shell tab
   - Run: `npm run seed`

#### MongoDB Atlas IP Whitelist
- Go to MongoDB Atlas → Network Access
- Add IP: `0.0.0.0/0` (Allow from anywhere) for production

---

### Option 2: Railway

#### Steps:

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **New Project**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Configure Service**
   - Railway auto-detects Node.js
   - Set Root Directory: `backend`
   - Add environment variables in Settings

4. **Environment Variables**
   ```
   MONGO_URI=<your-mongo-uri>
   PORT=5000
   NODE_ENV=production
   ```

5. **Deploy**
   - Railway automatically deploys
   - Get your URL from Settings → Domains

---

## Frontend Deployment

### Option 1: Vercel (Recommended - Free Tier Available)

#### Steps:

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Project**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables**
   - Add in Project Settings → Environment Variables
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Your site URL: `https://your-project.vercel.app`

6. **Update CORS in Backend**
   - Add your Vercel URL to CORS whitelist in `backend/server.js`:
   ```javascript
   app.use(cors({
     origin: ['https://your-project.vercel.app', 'http://localhost:3000']
   }));
   ```

---

### Option 2: Netlify

#### Steps:

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub

2. **Add New Site**
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select repository

3. **Build Settings**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

4. **Environment Variables**
   - Go to Site settings → Build & deploy → Environment
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

5. **Deploy**
   - Click "Deploy site"
   - Your URL: `https://your-site.netlify.app`

---

## Post-Deployment Checklist

### ✅ Backend
- [ ] Backend URL is accessible
- [ ] MongoDB connection successful
- [ ] Database seeded with sample data
- [ ] API endpoints working (test with Postman/Thunder Client)
- [ ] CORS configured for frontend domain

### ✅ Frontend
- [ ] Frontend loads successfully
- [ ] Can browse experiences
- [ ] Can select dates and times
- [ ] Checkout flow works
- [ ] Promo codes validate
- [ ] Booking confirmation displays

### ✅ Integration
- [ ] Frontend connects to backend API
- [ ] No CORS errors in browser console
- [ ] Images load from Unsplash
- [ ] All pages navigate correctly
- [ ] Mobile responsive design works

---

## Testing Production Deployment

### 1. Test Backend API
```bash
# Get all experiences
curl https://your-backend.onrender.com/api/experiences

# Get single experience
curl https://your-backend.onrender.com/api/experiences/{id}

# Validate promo code
curl -X POST https://your-backend.onrender.com/api/promo/validate \
  -H "Content-Type: application/json" \
  -d '{"code":"SAVE10","subtotal":1000}'
```

### 2. Test Frontend
1. Open deployed URL in browser
2. Click through complete booking flow:
   - Browse experiences → Select experience
   - Choose date → Choose time
   - Enter details → Apply promo code
   - Complete booking → View confirmation

### 3. Check Browser Console
- No errors should appear
- Network tab shows successful API calls
- Images load properly

---

## Environment-Specific Configuration

### Development (.env.development)
```env
VITE_API_URL=http://localhost:5000/api
```

### Production (.env.production)
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## Continuous Deployment

Both Render and Vercel support automatic deployments:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. **Auto-Deploy**
   - Render: Watches `main` branch, deploys on push
   - Vercel: Deploys on every push automatically

---

## Custom Domain (Optional)

### Add Custom Domain to Vercel
1. Go to Project Settings → Domains
2. Add your domain (e.g., `bookit.yourdomain.com`)
3. Update DNS records as instructed by Vercel
4. Update CORS in backend with new domain

### Add Custom Domain to Render
1. Go to Service Settings → Custom Domains
2. Add your domain
3. Configure DNS CNAME record
4. SSL automatically provisioned by Render

---

## Monitoring & Logs

### Render Dashboard
- View logs in real-time
- Monitor CPU and memory usage
- Set up alerts for downtime

### Vercel Dashboard
- View deployment logs
- Analytics for page views
- Performance insights

---

## Troubleshooting

### Backend Issues

**MongoDB Connection Timeout**
- Check MongoDB Atlas IP whitelist
- Verify connection string in environment variables
- Check MongoDB Atlas cluster status

**API Returns 500 Error**
- Check Render logs for error details
- Verify all environment variables set correctly
- Ensure database is seeded

### Frontend Issues

**API Calls Fail (CORS Error)**
```javascript
// backend/server.js - Update CORS configuration
const cors = require('cors');
app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

**Environment Variables Not Working**
- Prefix must be `VITE_` for Vite
- Rebuild and redeploy after changing env vars
- Clear build cache if needed

**Images Not Loading**
- Check Unsplash URLs are accessible
- Verify HTTPS (not HTTP) image URLs
- Check browser console for CSP errors

---

## Performance Optimization

### Backend
- Enable compression middleware
- Add Redis caching for frequently accessed data
- Implement rate limiting

### Frontend
- Enable code splitting
- Optimize images (use WebP format)
- Implement lazy loading for images
- Add service worker for offline support

---

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use platform-specific env var management
   - Rotate MongoDB credentials periodically

2. **API Security**
   - Implement rate limiting
   - Add request validation
   - Use HTTPS only
   - Sanitize user inputs

3. **Database**
   - Use MongoDB Atlas with IP whitelist
   - Enable database encryption
   - Regular backups

---

## Backup & Recovery

### MongoDB Backup
1. MongoDB Atlas → Clusters → Backup
2. Set up automated daily backups
3. Can restore from any backup point

### Code Backup
- GitHub repository serves as version control
- Tag releases: `git tag v1.0.0`
- Keep production branch protected

---

## Support & Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html

---

## Deployment Timeline

- **Render Backend**: 3-5 minutes
- **Vercel Frontend**: 1-2 minutes
- **Database Seeding**: 1 minute
- **DNS Propagation** (custom domain): 24-48 hours

---

## Cost Estimates

### Free Tier Usage
- **Render**: 750 hours/month free
- **Vercel**: Unlimited bandwidth for personal projects
- **MongoDB Atlas**: 512MB free cluster
- **Total**: $0/month for development/portfolio projects

### Paid Plans (Optional)
- **Render Pro**: $7/month (better performance)
- **Vercel Pro**: $20/month (team features)
- **MongoDB Atlas M10**: $57/month (dedicated cluster)

---

**🎉 Congratulations! Your application is now live and accessible worldwide!**
