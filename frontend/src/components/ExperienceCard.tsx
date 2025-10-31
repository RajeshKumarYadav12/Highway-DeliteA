import { useNavigate } from 'react-router-dom';
import { Experience } from '../types';
import { MapPin, Star } from 'lucide-react';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="card hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => navigate(`/experience/${experience._id}`)}
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-gray-200">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80';
          }}
        />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-semibold">
          {experience.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
          {experience.title}
        </h3>
        
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{experience.location}</span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {experience.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">From </span>
            <span className="text-xl font-bold text-gray-900">₹{experience.price}</span>
          </div>
          
          <button className="btn-primary text-sm px-4 py-2">
            View Details
          </button>
        </div>

        {experience.rating && (
          <div className="flex items-center mt-3 pt-3 border-t border-gray-100">
            <Star className="w-4 h-4 text-primary fill-current" />
            <span className="ml-1 text-sm font-semibold">{experience.rating}</span>
            <span className="ml-1 text-sm text-gray-500">
              ({experience.reviews} reviews)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
