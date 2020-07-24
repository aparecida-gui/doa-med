import express from 'express';
import MedicineController from './controller/MedicineController';
import DonorController from './controller/DonorController';
import BeneficiaryController from './controller/BeneficiaryController';
import RegisterUserController from './controller/RegisterUserController';
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
// register user
router.post('/register_user', RegisterUserController.register);
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

router.get('/photo', PhotoController.showPhoto);

router.post('/login', BeneficiaryController.login);

export default router;
