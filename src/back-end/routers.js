import express from 'express';
import Medicine from './controller/MedicineController';
import multer from 'multer';
import multerConfig from '../config/multerConfig';

const router = express.Router();

router.get('/medicine/:name', Medicine.medicineSearch);
router.post(
  '/medicine',
  multer(multerConfig).single('photo'),
  Medicine.registerMedicine
);

export default router;
