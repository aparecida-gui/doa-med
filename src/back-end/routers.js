import express from 'express';
import MedicineController from './controller/MedicineController';
import DonorController from './controller/DonorController';
import multer from 'multer';
import multerConfig from '../config/multerConfig';

const router = express.Router();

router.get('/medicine/:name', MedicineController.medicineSearch);
router.post(
  '/medicine/:donor_id/register_medicine',
  MedicineController.registerMedicine
);

router.post('/donor', DonorController.registerDonor);

export default router;
