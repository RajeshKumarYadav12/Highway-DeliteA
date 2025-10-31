import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { validatePromoCode, createBooking } from '../api';

const CheckoutWithDetails = () => {
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

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>

              <div className="space-y-4">
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

                <div>
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
                      ✓ Promo code applied!
                    </p>
                  )}
                  {promoError && (
                    <p className="text-red-500 text-sm mt-2">{promoError}</p>
                  )}
                </div>

                <div className="pt-4">
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
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h2>

              {/* Experience Details */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900">{state.experienceTitle}</h3>
                <p className="text-gray-600 text-sm mt-1">Date: {state.date}</p>
                <p className="text-gray-600 text-sm">Time: {state.time}</p>
                <p className="text-gray-600 text-sm">Qty: {state.quantity}</p>
              </div>

              <div className="space-y-2 border-t border-gray-200 pt-4">
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
                    <span>Discount</span>
                    <span>-₹{promoDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
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
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutWithDetails;
