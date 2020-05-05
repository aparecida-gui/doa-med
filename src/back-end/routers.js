import express from 'express';
import Medicine from './controller/MedicineController';

const router = express.Router();

router.get('/medicine/:name', Medicine.medicineSearch);

export default router;
