import mongoose from 'mongoose';

const promoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'flat'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true
  },
  minAmount: {
    type: Number,
    default: 0
  },
  maxDiscount: {
    type: Number
  },
  active: {
    type: Boolean,
    default: true
  },
  expiryDate: {
    type: Date
  }
}, {
  timestamps: true
});

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);

export default PromoCode;
