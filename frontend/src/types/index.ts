export interface Experience {
  _id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  price: number;
  image: string;
  duration: string;
  groupSize: string;
  includes: string[];
  slots: Slot[];
  rating: number;
  reviews: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Slot {
  date: string;
  times: TimeSlot[];
  _id?: string;
}

export interface TimeSlot {
  time: string;
  available: number;
  booked: number;
  _id?: string;
}

export interface Booking {
  _id?: string;
  experienceId: string;
  experienceTitle: string;
  fullName: string;
  email: string;
  promoCode?: string;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  discount: number;
  total: number;
  bookingReference: string;
  status?: string;
  createdAt?: string;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  discount: number;
  valid: boolean;
  message: string;
}

export interface BookingState {
  experienceId: string;
  experienceTitle: string;
  date: string;
  time: string;
  quantity: number;
  price: number;
  image: string;
}
