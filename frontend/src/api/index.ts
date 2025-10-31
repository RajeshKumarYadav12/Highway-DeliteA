import axios from 'axios';
import { Experience, Booking, PromoCode } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Experiences
export const getExperiences = async (params?: {
  search?: string;
  category?: string;
  location?: string;
}) => {
  const response = await api.get<Experience[]>('/experiences', { params });
  return response.data;
};

export const getExperienceById = async (id: string) => {
  const response = await api.get<Experience>(`/experiences/${id}`);
  return response.data;
};

export const getExperienceSlots = async (id: string) => {
  const response = await api.get(`/experiences/${id}/slots`);
  return response.data;
};

// Bookings
export const createBooking = async (bookingData: Partial<Booking>) => {
  const response = await api.post<{ success: boolean; booking: Booking }>(
    '/bookings',
    bookingData
  );
  return response.data;
};

export const getBookingByReference = async (reference: string) => {
  const response = await api.get<Booking>(`/bookings/${reference}`);
  return response.data;
};

// Promo Codes
export const validatePromoCode = async (code: string, subtotal: number) => {
  const response = await api.post<PromoCode>('/promo/validate', {
    code,
    subtotal,
  });
  return response.data;
};

export default api;
