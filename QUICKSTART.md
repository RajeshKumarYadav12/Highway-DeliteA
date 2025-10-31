# 🚀 Quick Start Guide

Get the BookIt application running in 5 minutes!

## Prerequisites
- Node.js (v16+)
- npm
- Git

## Step 1: Clone & Install (2 minutes)

```bash
# Clone repository
git clone <your-repo-url>
cd Assignment4

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Setup Database (1 minute)

Backend `.env` file is already configured with MongoDB credentials.

Seed the database:
```bash
cd backend
npm run seed
```

You should see:
```
✓ MongoDB Connected
✓ 8 experiences added
✓ 4 promo codes added
✓ Database seeded successfully!
```

## Step 3: Start Servers (2 minutes)

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Backend runs on: **http://localhost:5000**

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Frontend runs on: **http://localhost:3000**

## Step 4: Test the Application ✨

1. Open browser: **http://localhost:3000**
2. Browse experiences on home page
3. Click any experience → Select date → Select time
4. Enter details at checkout
5. Try promo code: **SAVE10**
6. Complete booking and see confirmation!

---

## 🎯 Test Promo Codes

| Code | Discount | Min Amount |
|------|----------|------------|
| SAVE10 | 10% off | ₹500 |
| FLAT100 | ₹100 off | ₹1000 |
| WELCOME20 | 20% off | ₹2000 |
| ADVENTURE50 | ₹50 off | ₹500 |

---

## 📋 Available Experiences

1. **Kayaking** - Goa (₹999)
2. **Nandi Hills Sunrise** - Bangalore (₹899)
3. **Coffee Trail** - Coorg (₹1299)
4. **Boat Cruise** - Kerala (₹1999)
5. **Everest Jumping** - Rishikesh (₹2999)
6. **Scuba Diving** - Andaman (₹3999)
7. **Wildlife Safari** - Jim Corbett (₹2499)
8. **Paragliding** - Bir Billing (₹3499)

---

## 🐛 Troubleshooting

### Port Already in Use?

**Backend (5000):**
```bash
npx kill-port 5000
```

**Frontend (3000):**
```bash
npx kill-port 3000
```

### MongoDB Connection Error?
- Check if MongoDB URI is correct in `backend/.env`
- Verify internet connection
- MongoDB Atlas IP whitelist: Add `0.0.0.0/0`

### Frontend Can't Connect to Backend?
- Ensure backend is running on port 5000
- Check `frontend/.env` has `VITE_API_URL=http://localhost:5000/api`
- Clear browser cache

---

## 📖 Next Steps

- Read [README.md](./README.md) for full documentation
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for hosting guide
- Customize experiences in seed.js
- Add your own features!

---

## 🎨 Key Features Implemented

✅ Responsive design (mobile, tablet, desktop)
✅ Experience browsing and search
✅ Date and time slot selection
✅ Real-time availability checking
✅ Promo code validation
✅ Complete booking flow
✅ Booking confirmation with reference ID
✅ Clean, modern UI matching Figma design

---

## 📱 Test on Mobile

Frontend is fully responsive! To test on mobile:

```bash
# In frontend directory
npm run dev -- --host
```

Then access from phone using your computer's IP address:
`http://YOUR-IP:3000`

---

**Happy Coding! 🎉**

For questions, check the full [README.md](./README.md) or create an issue.
