import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Experience from './models/Experience.js';
import PromoCode from './models/PromoCode.js';

dotenv.config();

// Generate dates for the next 30 days
const generateSlots = () => {
  const slots = [];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dateString = date.toISOString().split('T')[0];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}`;
    
    slots.push({
      date: formattedDate,
      times: [
        { time: '07:30 am - 09:30 am', available: 10, booked: Math.floor(Math.random() * 3) },
        { time: '09:00 am - 11:00 am', available: 10, booked: Math.floor(Math.random() * 3) },
        { time: '11:00 am - 01:00 pm', available: 10, booked: Math.floor(Math.random() * 5) },
        { time: '01:30 pm - 03:30 pm', available: 10, booked: Math.floor(Math.random() * 4) },
        { time: '04:00 pm - 06:00 pm', available: 10, booked: Math.floor(Math.random() * 6) }
      ]
    });
  }
  
  return slots;
};

const experiences = [
  {
    title: 'Kayaking',
    category: 'Water Sports',
    location: 'Goa, India',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life Jacket along with an expert and accompany in kayaking.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
    duration: '2-3 hours',
    groupSize: 'Up to 10 people',
    includes: [
      'Professional kayaking guide',
      'Safety equipment (helmet, life jacket)',
      'Kayaking gear',
      'Refreshments'
    ],
    slots: generateSlots(),
    rating: 4.8,
    reviews: 245
  },
  {
    title: 'Nandi Hills Sunrise',
    category: 'Trekking',
    location: 'Bangalore, India',
    description: 'Experience the breathtaking sunrise from Nandi Hills. Join us for an early morning trek to witness nature at its finest with panoramic views.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80',
    duration: '4-5 hours',
    groupSize: 'Up to 15 people',
    includes: [
      'Professional trekking guide',
      'Transportation from meeting point',
      'Breakfast',
      'First aid kit'
    ],
    slots: generateSlots(),
    rating: 4.9,
    reviews: 523
  },
  {
    title: 'Coffee Trail',
    category: 'Nature Walk',
    location: 'Coorg, India',
    description: 'Explore the aromatic coffee plantations of Coorg. Learn about coffee cultivation, processing, and enjoy fresh brews amidst scenic landscapes.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&auto=format&fit=crop&q=80',
    duration: '3-4 hours',
    groupSize: 'Up to 12 people',
    includes: [
      'Plantation tour guide',
      'Coffee tasting session',
      'Light snacks',
      'Transportation'
    ],
    slots: generateSlots(),
    rating: 4.7,
    reviews: 189
  },
  {
    title: 'Boat Cruise',
    category: 'Water Activities',
    location: 'Kerala Backwaters',
    description: 'Sail through the serene backwaters of Kerala. Experience traditional houseboat cruise with authentic Kerala cuisine and stunning sunset views.',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop&q=80',
    duration: '3-4 hours',
    groupSize: 'Up to 20 people',
    includes: [
      'Houseboat cruise',
      'Traditional Kerala lunch',
      'Sunset viewing',
      'Local guide'
    ],
    slots: generateSlots(),
    rating: 4.9,
    reviews: 412
  },
  {
    title: 'Everest Jumping',
    category: 'Adventure Sports',
    location: 'Rishikesh, India',
    description: 'Take the ultimate leap of faith with bungee jumping from India\'s highest platform. Professional instructors ensure safety while you conquer your fears.',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&auto=format&fit=crop&q=80',
    duration: '2 hours',
    groupSize: 'Individual slots',
    includes: [
      'Safety equipment',
      'Professional instructors',
      'HD video recording',
      'Certificate of completion'
    ],
    slots: generateSlots(),
    rating: 4.8,
    reviews: 678
  },
  {
    title: 'Scuba Diving',
    category: 'Water Sports',
    location: 'Andaman Islands',
    description: 'Dive into the crystal clear waters of Andaman. Explore vibrant coral reefs and marine life with certified PADI instructors.',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop&q=80',
    duration: '3-4 hours',
    groupSize: 'Up to 6 people',
    includes: [
      'PADI certified instructor',
      'Complete diving gear',
      'Underwater photography',
      'Certificate'
    ],
    slots: generateSlots(),
    rating: 5.0,
    reviews: 892
  },
  {
    title: 'Wildlife Safari',
    category: 'Wildlife',
    location: 'Jim Corbett, India',
    description: 'Embark on an exciting jeep safari through Jim Corbett National Park. Spot tigers, elephants, and diverse wildlife in their natural habitat.',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80',
    duration: '4-5 hours',
    groupSize: 'Up to 8 people',
    includes: [
      'Jeep safari',
      'Expert naturalist',
      'Park entry fees',
      'Refreshments'
    ],
    slots: generateSlots(),
    rating: 4.7,
    reviews: 356
  },
  {
    title: 'Paragliding',
    category: 'Adventure Sports',
    location: 'Bir Billing, Himachal',
    description: 'Soar through the skies at Asia\'s best paragliding destination. Experience bird\'s eye views of the Himalayan valleys with expert pilots.',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&auto=format&fit=crop&q=80',
    duration: '20-30 minutes',
    groupSize: 'Individual slots',
    includes: [
      'Tandem flight with certified pilot',
      'Safety gear',
      'GoPro footage',
      'Transportation to takeoff point'
    ],
    slots: generateSlots(),
    rating: 4.9,
    reviews: 734
  }
];

const promoCodes = [
  {
    code: 'SAVE10',
    discountType: 'percentage',
    discountValue: 10,
    minAmount: 500,
    maxDiscount: 500,
    active: true
  },
  {
    code: 'FLAT100',
    discountType: 'flat',
    discountValue: 100,
    minAmount: 1000,
    active: true
  },
  {
    code: 'WELCOME20',
    discountType: 'percentage',
    discountValue: 20,
    minAmount: 2000,
    maxDiscount: 1000,
    active: true
  },
  {
    code: 'ADVENTURE50',
    discountType: 'flat',
    discountValue: 50,
    minAmount: 500,
    active: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Experience.deleteMany();
    await PromoCode.deleteMany();
    console.log('Data cleared');

    // Insert experiences
    await Experience.insertMany(experiences);
    console.log(`${experiences.length} experiences added`);

    // Insert promo codes
    await PromoCode.insertMany(promoCodes);
    console.log(`${promoCodes.length} promo codes added`);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
