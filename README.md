# BookIt: Experiences & Slots Booking Platform

A fullstack web application for booking travel experiences and adventure activities. Users can browse experiences, select available time slots, apply promo codes, and complete bookings.

## 🚀 Features

### Frontend
- **React + TypeScript** with Vite for fast development
- **TailwindCSS** for responsive, modern UI design
- **React Router** for seamless navigation
- **Axios** for API integration
- **Lucide React** for beautiful icons

### Backend
- **Node.js + Express** RESTful API
- **MongoDB** with Mongoose ODM
- **CORS** enabled for cross-origin requests
- **Input validation** and error handling

### Key Functionality
- Browse and search experiences
- View detailed experience information
- Select dates and time slots
- Real-time slot availability
- Promo code validation and discounts
- Secure booking creation
- Booking confirmation with reference ID
- Fully responsive design (mobile, tablet, desktop)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Assignment4
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb+srv://yrajeshkumar799:3S2JRJQPog4EGsOA@cluster0.rp5sr.mongodb.net/TaskC
PORT=5000
NODE_ENV=development
```

### 3. Seed Database

```bash
npm run seed
```

This will populate your database with:
- 8 sample experiences (Kayaking, Trekking, Coffee Trail, etc.)
- 4 promo codes (SAVE10, FLAT100, WELCOME20, ADVENTURE50)
- 30 days of available slots for each experience

### 4. Start Backend Server

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 5. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

### 6. Start Frontend

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Experiences

- **GET** `/api/experiences` - Get all experiences
  - Query params: `search`, `category`, `location`
- **GET** `/api/experiences/:id` - Get single experience
- **GET** `/api/experiences/:id/slots` - Get slots for experience

### Bookings

- **POST** `/api/bookings` - Create new booking
  ```json
  {
    "experienceId": "string",
    "fullName": "string",
    "email": "string",
    "promoCode": "string",
    "date": "string",
    "time": "string",
    "quantity": number,
    "subtotal": number,
    "taxes": number,
    "discount": number,
    "total": number
  }
  ```
- **GET** `/api/bookings/:reference` - Get booking by reference
- **GET** `/api/bookings` - Get all bookings

### Promo Codes

- **POST** `/api/promo/validate` - Validate promo code
  ```json
  {
    "code": "string",
    "subtotal": number
  }
  ```
- **GET** `/api/promo` - Get all active promo codes

## 🎨 Pages & User Flow

1. **Home Page** (`/`) - Browse all experiences
2. **Search Page** (`/search`) - Search and filter experiences
3. **Select Date** (`/experience/:id`) - View experience details and choose date
4. **Select Time** (`/experience/:id/select-time`) - Choose time slot and quantity
5. **Checkout** (`/checkout`) - Enter details, apply promo, and confirm
6. **Confirmation** (`/confirmation`) - View booking confirmation

## 💳 Sample Promo Codes

Test these promo codes during checkout:

| Code | Type | Discount | Min Amount |
|------|------|----------|------------|
| `SAVE10` | Percentage | 10% off | ₹500 |
| `FLAT100` | Flat | ₹100 off | ₹1000 |
| `WELCOME20` | Percentage | 20% off | ₹2000 |
| `ADVENTURE50` | Flat | ₹50 off | ₹500 |

## 🎯 Technical Highlights

### Frontend
- **Type Safety**: Full TypeScript implementation
- **State Management**: React hooks (useState, useEffect)
- **Routing**: React Router with protected routes and state passing
- **API Layer**: Centralized Axios configuration
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Form Validation**: Client-side validation for user inputs

### Backend
- **MVC Pattern**: Organized controllers, models, and routes
- **Mongoose Schemas**: Strong data validation
- **Error Handling**: Centralized error middleware
- **Booking Logic**: Prevents double-booking and validates slot availability
- **Promo System**: Supports percentage and flat discounts

## 🏗️ Project Structure

```
Assignment4/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── experienceController.js
│   │   ├── bookingController.js
│   │   └── promoController.js
│   ├── models/
│   │   ├── Experience.js
│   │   ├── Booking.js
│   │   └── PromoCode.js
│   ├── routes/
│   │   ├── experienceRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── promoRoutes.js
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── index.ts
    │   ├── components/
    │   │   ├── Header.tsx
    │   │   ├── ExperienceCard.tsx
    │   │   └── Loading.tsx
    │   ├── pages/
    │   │   ├── Home.tsx
    │   │   ├── Search.tsx
    │   │   ├── SelectDate.tsx
    │   │   ├── SelectTime.tsx
    │   │   ├── Checkout.tsx
    │   │   ├── CheckoutWithDetails.tsx
    │   │   └── Confirmation.tsx
    │   ├── types/
    │   │   └── index.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── .env
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── tsconfig.json
    └── vite.config.ts
```

## 🔧 Environment Variables

### Backend (.env)
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Backend Deployment (Render/Railway)

1. Create new web service
2. Connect your GitHub repository
3. Set environment variables (MONGO_URI, PORT, NODE_ENV)
4. Build command: `npm install`
5. Start command: `npm start`

### Frontend Deployment (Vercel/Netlify)

1. Create new project
2. Connect your GitHub repository
3. Set build directory to `frontend`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Set environment variable: `VITE_API_URL=<your-backend-url>/api`

## 🧪 Testing the Application

1. Start both backend and frontend servers
2. Open `http://localhost:3000`
3. Browse experiences on home page
4. Click on any experience to view details
5. Select a date and time slot
6. Enter your details at checkout
7. Try applying a promo code (e.g., SAVE10)
8. Complete booking and view confirmation

## 📱 Responsive Design

The application is fully responsive and tested on:
- Mobile devices (320px - 768px)
- Tablets (768px - 1024px)
- Desktop (1024px+)

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
- Verify MONGO_URI in .env
- Check MongoDB Atlas IP whitelist
- Ensure database user has correct permissions

**Port Already in Use**
- Change PORT in .env file
- Kill process using the port: `npx kill-port 5000`

### Frontend Issues

**API Connection Failed**
- Ensure backend is running on port 5000
- Check VITE_API_URL in frontend/.env
- Verify CORS is enabled in backend

**Build Errors**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## 👨‍💻 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite HMR enabled
```

### Adding New Experiences
Run the seed script or use MongoDB Compass to add experiences manually following the schema in `models/Experience.js`.

## 📄 License

This project is created for educational purposes as part of a fullstack internship assignment.

## 🙋‍♂️ Support

For any questions or issues, please create an issue in the GitHub repository.

---

**Built with ❤️ using React, TypeScript, Node.js, Express, and MongoDB**
#   H i g h w a y - D e l i t e A  
 