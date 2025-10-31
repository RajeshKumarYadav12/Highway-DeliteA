import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { getExperienceById } from '../api';
import { Experience } from '../types';

const SelectTime = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as any;

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchExperience();
    }
  }, [id]);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const data = await getExperienceById(id!);
      setExperience(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectedSlot = experience?.slots.find(s => s.date === state?.date);

  const handleContinue = () => {
    if (!selectedTime || !experience) return;

    navigate('/checkout', {
      state: {
        experienceId: experience._id,
        experienceTitle: experience.title,
        date: state.date,
        time: selectedTime,
        quantity,
        price: experience.price,
        image: experience.image,
      }
    });
  };

  if (loading) return <Loading />;
  if (!experience || !state) return <div>Experience not found</div>;

  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + taxes;

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
          <span className="ml-1">Details</span>
        </button>

        {/* Experience Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-bold text-gray-900">{experience.title}</h1>
              <p className="text-gray-600 mt-1">{state.date}</p>
            </div>
          </div>
        </div>

        {/* Time Selection */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Choose time</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedSlot?.times.map((timeSlot, index) => {
              const available = timeSlot.available - timeSlot.booked;
              const isSoldOut = available <= 0;

              return (
                <button
                  key={index}
                  onClick={() => !isSoldOut && setSelectedTime(timeSlot.time)}
                  disabled={isSoldOut}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedTime === timeSlot.time
                      ? 'border-primary bg-yellow-50'
                      : isSoldOut
                      ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">{timeSlot.time}</span>
                    {isSoldOut ? (
                      <span className="text-sm text-red-500 font-semibold">Sold Out</span>
                    ) : (
                      <span className="text-sm text-gray-500">{available} slots left</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantity and Price */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-600 mb-6">{experience.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-gray-900">Quantity</span>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400"
              >
                -
              </button>
              <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400"
              >
                +
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="space-y-2 border-t border-gray-200 pt-4">
            <div className="flex justify-between text-gray-600">
              <span>Starts at</span>
              <span>₹{experience.price}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Quantity</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedTime}
            className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SelectTime;
