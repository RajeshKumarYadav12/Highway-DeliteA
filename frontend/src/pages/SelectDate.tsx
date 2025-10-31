import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Clock, Users, Check } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { getExperienceById } from '../api';
import { Experience } from '../types';

const SelectDate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');

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
      if (data.slots.length > 0) {
        setSelectedDate(data.slots[0].date);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!selectedDate) return;
    
    navigate(`/experience/${id}/select-time`, {
      state: {
        experienceId: experience?._id,
        experienceTitle: experience?.title,
        date: selectedDate,
        price: experience?.price,
        image: experience?.image,
      }
    });
  };

  if (loading) return <Loading />;
  if (!experience) return <div>Experience not found</div>;

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

        {/* Experience Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="md:flex">
            {/* Image */}
            <div className="md:w-2/5">
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 md:w-3/5">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {experience.title}
              </h1>

              <div className="space-y-3 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                  <span>{experience.location}</span>
                </div>

                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-400" />
                  <span>{experience.duration}</span>
                </div>

                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-gray-400" />
                  <span>{experience.groupSize}</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-600">{experience.description}</p>
              </div>

              {experience.includes && experience.includes.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">What's Included</h3>
                  <div className="space-y-2">
                    {experience.includes.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Choose date</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {experience.slots.slice(0, 10).map((slot, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(slot.date)}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  selectedDate === slot.date
                    ? 'border-primary bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-semibold text-gray-900">
                  {slot.date.split(' ')[0]}
                </div>
                <div className="text-2xl font-bold text-gray-900 my-1">
                  {slot.date.split(' ')[1]}
                </div>
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedDate}
            className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SelectDate;
