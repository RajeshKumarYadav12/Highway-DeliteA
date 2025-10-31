import Booking from '../models/Booking.js';
import Experience from '../models/Experience.js';
import PromoCode from '../models/PromoCode.js';

// Generate unique booking reference
const generateBookingReference = () => {
  const prefix = 'HUF';
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const suffix = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                 String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `${prefix}${randomNum}${suffix}`;
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res) => {
  try {
    const {
      experienceId,
      fullName,
      email,
      promoCode,
      date,
      time,
      quantity,
      subtotal,
      taxes,
      discount,
      total
    } = req.body;

    // Validate required fields
    if (!experienceId || !fullName || !email || !date || !time || !quantity) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if experience exists
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    // Find the slot and check availability
    const slot = experience.slots.find(s => s.date === date);
    if (!slot) {
      return res.status(400).json({ message: 'Selected date not available' });
    }

    const timeSlot = slot.times.find(t => t.time === time);
    if (!timeSlot) {
      return res.status(400).json({ message: 'Selected time not available' });
    }

    if (timeSlot.available - timeSlot.booked < quantity) {
      return res.status(400).json({ message: 'Not enough slots available' });
    }

    // Update slot availability
    timeSlot.booked += quantity;
    await experience.save();

    // Create booking
    const bookingReference = generateBookingReference();
    
    const booking = await Booking.create({
      experienceId,
      experienceTitle: experience.title,
      fullName,
      email,
      promoCode: promoCode || '',
      date,
      time,
      quantity,
      subtotal,
      taxes,
      discount: discount || 0,
      total,
      bookingReference
    });

    res.status(201).json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get booking by reference
// @route   GET /api/bookings/:reference
// @access  Public
export const getBookingByReference = async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      bookingReference: req.params.reference 
    }).populate('experienceId');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('experienceId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
