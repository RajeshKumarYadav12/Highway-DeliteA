import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { validatePromoCode, createBooking } from '../api';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as any;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  if (!state) {
    navigate('/');
    return null;
  }

  const subtotal = state.price * state.quantity;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + taxes - promoDiscount;

  const handlePromoApply = async () => {
    if (!promoCode.trim()) return;

    try {
      setPromoError('');
      const result = await validatePromoCode(promoCode, subtotal);
      if (result.valid) {
        setPromoDiscount(result.discount);
        setPromoApplied(true);
      }
    } catch (error: any) {
      setPromoError(error.response?.data?.message || 'Invalid promo code');
      setPromoDiscount(0);
      setPromoApplied(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeToTerms) {
      alert('Please agree to the terms and safety policy');
      return;
    }

    try {
      setLoading(true);
      const bookingData = {
        experienceId: state.experienceId,
        experienceTitle: state.experienceTitle,
        fullName,
        email,
        promoCode: promoApplied ? promoCode : '',
        date: state.date,
        time: state.time,
        quantity: state.quantity,
        subtotal,
        taxes,
        discount: promoDiscount,
        total,
      };

      const response = await createBooking(bookingData);
      
      navigate('/confirmation', {
        state: {
          booking: response.booking,
        },
      });
    } catch (error) {
      console.error(error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="ml-1">Checkout</span>
        </button>

        <form onSubmit={handleSubmit}>
          {/* Experience Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex">
              <img
                src={state.image}
                alt={state.experienceTitle}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                <h2 className="font-bold text-gray-900">{state.experienceTitle}</h2>
                <p className="text-gray-600 text-sm mt-1">Date: {state.date}</p>
                <p className="text-gray-600 text-sm">Time: {state.time}</p>
                <p className="text-gray-600 text-sm">Qty: {state.quantity}</p>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="test@email.com"
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promo code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value.toUpperCase());
                    setPromoApplied(false);
                    setPromoError('');
                  }}
                  placeholder="Enter code"
                  className="input-field flex-1"
                  disabled={promoApplied}
                />
                <button
                  type="button"
                  onClick={handlePromoApply}
                  disabled={promoApplied || !promoCode.trim()}
                  className="btn-secondary px-6 disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-green-600 text-sm mt-2 font-semibold">
                  ✓ Promo code applied successfully!
                </p>
              )}
              {promoError && (
                <p className="text-red-500 text-sm mt-2">{promoError}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="mt-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="mt-1 mr-3"
                  required
                />
                <span className="text-sm text-gray-600">
                  I agree to the terms and safety policy
                </span>
              </label>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Experience</span>
                <span>{state.experienceTitle}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Date</span>
                <span>{state.date}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Time</span>
                <span>{state.time}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Qty</span>
                <span>{state.quantity}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes</span>
                <span>₹{taxes}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Discount ({promoCode})</span>
                  <span>-₹{promoDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Pay and Confirm'}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
