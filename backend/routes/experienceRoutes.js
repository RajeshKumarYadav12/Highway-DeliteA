import express from 'express';
import {
  getExperiences,
  getExperienceById,
  getExperienceSlots
} from '../controllers/experienceController.js';

const router = express.Router();

router.get('/', getExperiences);
router.get('/:id', getExperienceById);
router.get('/:id/slots', getExperienceSlots);

export default router;
