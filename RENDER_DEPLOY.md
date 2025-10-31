# Render Deployment Guide - Backend

## 🚀 Deploy Backend to Render

Your backend is ready for deployment! Follow these steps:

---

## Step 1: Prepare Backend for Production

### Already Configured ✅
- MongoDB connection ready
- Environment variables setup
- API endpoints tested
- Seed script available

---

## Step 2: Deploy to Render

### Option A: Via Render Dashboard (Recommended)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Or use **"Public Git repository"** and paste your repo URL

3. **Configure Service**
   ```
   Name: bookit-backend
   Region: Oregon (US West) or closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Select Plan**
   - **Free Plan**: Perfect for development/portfolio
   - Instance Type: Free

5. **Environment Variables**
   Click **"Advanced"** and add:
   ```
   MONGO_URI = mongodb+srv://yrajeshkumar799:3S2JRJQPog4EGsOA@cluster0.rp5sr.mongodb.net/TaskC
   PORT = 5000
   NODE_ENV = production
   ```

6. **Deploy**
   - Click **"Create Web Service"**
   - Wait 2-3 minutes for deployment
   - Your backend URL: `https://bookit-backend.onrender.com`

---

## Step 3: Seed Database (One-Time)

After deployment succeeds:

1. Go to your service dashboard on Render
2. Click **"Shell"** tab (top right)
3. Run:
   ```bash
   npm run seed
   ```

You should see:
```
✓ MongoDB Connected
✓ 8 experiences added
✓ 4 promo codes added
✓ Database seeded successfully!
```

---

## Step 4: Test Backend API

### Test Endpoints:
```bash
# Get all experiences
curl https://your-backend.onrender.com/api/experiences

# Health check
curl https://your-backend.onrender.com/

# Validate promo code
curl -X POST https://your-backend.onrender.com/api/promo/validate \
  -H "Content-Type: application/json" \
  -d '{"code":"SAVE10","subtotal":1000}'
```

Expected response:
```json
{
  "valid": true,
  "discount": 100,
  "message": "Promo code applied successfully"
}
```

---

## Step 5: Update Frontend

Once backend is deployed, update your frontend:

1. **Local Environment** (`frontend/.env`):
   ```env
   VITE_API_URL=https://your-backend.onrender.com/api
   ```

2. **Vercel Environment Variables**:
   - Go to Vercel Dashboard → Your Project
   - Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL = https://your-backend.onrender.com/api
     ```
   - Redeploy frontend

---

## Step 6: Configure MongoDB Atlas

### Whitelist Render IPs:
1. Go to MongoDB Atlas Dashboard
2. Network Access → IP Whitelist
3. Add: `0.0.0.0/0` (Allow from anywhere)
   - **Note**: For production, use specific Render IPs

---

## 🎯 Deployment Checklist

- [x] Backend code ready
- [x] MongoDB URI configured
- [ ] Render account created
- [ ] GitHub repository pushed (optional)
- [ ] Web service created on Render
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] Database seeded
- [ ] API endpoints tested
- [ ] Frontend updated with backend URL

---

## 📊 Expected Deployment Time

- **Initial Deploy**: 2-3 minutes
- **Subsequent Deploys**: 1-2 minutes
- **Cold Start** (free tier): ~30 seconds

---

## 🔧 Render Service Details

### Free Tier Specs:
- **RAM**: 512 MB
- **CPU**: Shared
- **Bandwidth**: 100 GB/month
- **Hours**: 750 hours/month
- **Cold Start**: Service spins down after 15 min inactivity

### Keep Service Awake (Optional):
Use a service like [UptimeRobot](https://uptimerobot.com) to ping your backend every 5 minutes.

---

## 🔍 Monitor Your Backend

### Render Dashboard Features:
- **Logs**: Real-time application logs
- **Metrics**: CPU and memory usage
- **Events**: Deployment history
- **Shell**: Direct terminal access

### View Logs:
1. Go to your service on Render
2. Click **"Logs"** tab
3. See real-time backend activity

---

## 🐛 Troubleshooting

### Deployment Fails
**Check Logs for errors:**
1. Click **"Logs"** in Render dashboard
2. Look for error messages
3. Common issues:
   - Missing dependencies
   - MongoDB connection errors
   - Environment variables not set

### MongoDB Connection Timeout
```bash
# Fix: Update MongoDB Atlas IP Whitelist
# Add: 0.0.0.0/0
```

### API Returns 404
```bash
# Fix: Check Root Directory in Render settings
# Should be: backend
```

### CORS Errors from Frontend
Update `backend/server.js`:
```javascript
app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```
Redeploy backend after changes.

---

## 🔄 Auto-Deploy on Push

### Enable Auto-Deploy:
1. Connect GitHub repository to Render
2. Render watches your `main` branch
3. Every push automatically deploys

### Manual Deploy:
- Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## 📱 Custom Domain (Optional)

### Add Custom Domain:
1. Go to **Settings** → **Custom Domain**
2. Add: `api.yourdomain.com`
3. Update DNS CNAME record
4. SSL auto-provisioned by Render

---

## 🎉 Success!

After deployment, your backend will be live at:
```
https://your-backend.onrender.com
```

### API Endpoints:
- `GET /api/experiences`
- `GET /api/experiences/:id`
- `POST /api/bookings`
- `POST /api/promo/validate`

---

## 💡 Next Steps

1. ✅ Deploy backend to Render
2. ✅ Seed database
3. ✅ Test API endpoints
4. ✅ Update frontend with backend URL
5. ✅ Deploy frontend to Vercel
6. ✅ Test full application flow
7. 🎊 Share your live application!

---

## 📞 Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com

**Happy Deploying! 🚀**
