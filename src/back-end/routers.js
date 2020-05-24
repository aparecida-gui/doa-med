import express from 'express';
import MedicineController from './controller/MedicineController';
import DonorController from './controller/DonorController';
import BeneficiaryController from './controller/BeneficiaryController';
import MedicineBeneficiaryController from './controller/MedicineBeneficiaryController';
import PhotoController from './controller/PhotoController';
import multer from 'multer';
import multerConfig from '../config/multerConfig';

const router = express.Router();

router.get('/medicine/:name', MedicineController.medicineSearch);
router.post(
  '/medicine/:donor_id/register_medicine',
  MedicineController.registerMedicine
);

router.post('/donor/register_donor', DonorController.registerDonor);
router.post(
  '/beneficiary/register_beneficiary',
  BeneficiaryController.registerBeneficiary
);
router.get(
  '/beneficiary/show_beneficiary',
  BeneficiaryController.showMedicineBeneficiary
);
router.post(
  '/medicine/:beneficiary_id/register_medicine_benef',
  MedicineBeneficiaryController.registerMedicineBeneficiary
);

router.post(
  '/medicine/:medicine_beneficiary_id/photo',
  multer(multerConfig).single('name'),
  PhotoController.AddPhoto
);

export default router;
