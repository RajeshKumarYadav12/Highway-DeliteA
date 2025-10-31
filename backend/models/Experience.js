import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  times: [{
    time: {
      type: String,
      required: true
    },
    available: {
      type: Number,
      default: 10
    },
    booked: {
      type: Number,
      default: 0
    }
  }]
});

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    default: '2-3 hours'
  },
  groupSize: {
    type: String,
    default: 'Up to 10 people'
  },
  includes: [{
    type: String
  }],
  slots: [slotSchema],
  rating: {
    type: Number,
    default: 4.5
  },
  reviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
