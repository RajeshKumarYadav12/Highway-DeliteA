import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any;

  if (!state?.booking) {
    navigate('/');
    return null;
  }

  const { booking } = state;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed
          </h1>
          <p className="text-gray-600 mb-8">
            Your booking has been successfully confirmed!
          </p>

          {/* Booking Reference */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Booking Reference</p>
            <p className="text-2xl font-bold text-gray-900">
              Ref ID: {booking.bookingReference}
            </p>
          </div>

          {/* Booking Details */}
          <div className="text-left border-t border-gray-200 pt-6 mb-8">
            <h2 className="font-bold text-gray-900 mb-4">Booking Details</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Experience</span>
                <span className="font-semibold text-gray-900">{booking.experienceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-semibold text-gray-900">{booking.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span className="font-semibold text-gray-900">{booking.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity</span>
                <span className="font-semibold text-gray-900">{booking.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-semibold text-gray-900">{booking.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-semibold text-gray-900">{booking.email}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{booking.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span>₹{booking.taxes}</span>
                </div>
                {booking.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{booking.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Paid</span>
                  <span>₹{booking.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="btn-primary w-full"
            >
              Back to Home
            </button>
            <p className="text-sm text-gray-500">
              A confirmation email has been sent to {booking.email}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Confirmation;
