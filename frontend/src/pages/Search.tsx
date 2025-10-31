import { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExperienceCard from '../components/ExperienceCard';
import { getExperiences } from '../api';
import { Experience } from '../types';

const Search = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async (search?: string) => {
    try {
      setLoading(true);
      const data = await getExperiences(search ? { search } : undefined);
      setExperiences(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchExperiences(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />

      {/* Search Section */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for experiences..."
                className="input-field pl-12"
                autoFocus
              />
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary px-6 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchTerm ? `Results for "${searchTerm}"` : 'All Experiences'}
          </h2>
          <p className="text-gray-600 mt-1">
            {loading ? 'Searching...' : `${experiences.length} results found`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((experience) => (
            <ExperienceCard key={experience._id} experience={experience} />
          ))}
        </div>

        {!loading && experiences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No experiences found{searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Search;
