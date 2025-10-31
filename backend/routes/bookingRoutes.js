import express from 'express';
import {
  createBooking,
  getBookingByReference,
  getAllBookings
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/:reference', getBookingByReference);

export default router;
