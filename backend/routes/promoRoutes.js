import express from 'express';
import {
  validatePromoCode,
  getAllPromoCodes
} from '../controllers/promoController.js';

const router = express.Router();

router.post('/validate', validatePromoCode);
router.get('/', getAllPromoCodes);

export default router;
