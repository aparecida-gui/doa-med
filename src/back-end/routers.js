import express from 'express';
import Medicine from './controller/MedicineController';

const router = express.Router();

router.get('/medicine/:name', Medicine.medicineSearch);
router.post('/medicine', Medicine.registerMedicine);

export default router;
