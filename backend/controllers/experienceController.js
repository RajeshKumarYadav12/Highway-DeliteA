import Experience from '../models/Experience.js';

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
export const getExperiences = async (req, res) => {
  try {
    const { search, category, location } = req.query;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    const experiences = await Experience.find(query);
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single experience by ID
// @route   GET /api/experiences/:id
// @access  Public
export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get available slots for an experience
// @route   GET /api/experiences/:id/slots
// @access  Public
export const getExperienceSlots = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id).select('slots');
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    res.json(experience.slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
