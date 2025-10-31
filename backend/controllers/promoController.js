import PromoCode from '../models/PromoCode.js';

// @desc    Validate promo code
// @route   POST /api/promo/validate
// @access  Public
export const validatePromoCode = async (req, res) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Promo code is required' });
    }

    const promoCode = await PromoCode.findOne({ 
      code: code.toUpperCase(),
      active: true 
    });

    if (!promoCode) {
      return res.status(404).json({ 
        valid: false,
        message: 'Invalid promo code' 
      });
    }

    // Check if expired
    if (promoCode.expiryDate && new Date() > promoCode.expiryDate) {
      return res.status(400).json({ 
        valid: false,
        message: 'Promo code has expired' 
      });
    }

    // Check minimum amount
    if (subtotal < promoCode.minAmount) {
      return res.status(400).json({ 
        valid: false,
        message: `Minimum order amount of ₹${promoCode.minAmount} required` 
      });
    }

    // Calculate discount
    let discount = 0;
    if (promoCode.discountType === 'percentage') {
      discount = (subtotal * promoCode.discountValue) / 100;
      if (promoCode.maxDiscount && discount > promoCode.maxDiscount) {
        discount = promoCode.maxDiscount;
      }
    } else if (promoCode.discountType === 'flat') {
      discount = promoCode.discountValue;
    }

    res.json({
      valid: true,
      code: promoCode.code,
      discountType: promoCode.discountType,
      discountValue: promoCode.discountValue,
      discount: Math.round(discount),
      message: 'Promo code applied successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all active promo codes (for admin/testing)
// @route   GET /api/promo
// @access  Public
export const getAllPromoCodes = async (req, res) => {
  try {
    const promoCodes = await PromoCode.find({ active: true });
    res.json(promoCodes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
