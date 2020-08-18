import express from 'express';
const router = express.Router();

import RegisterUserController from './controller/RegisterUserController';
import LoginController from './controller/LoginController';
import BeneficiaryController from './controller/BeneficiaryController';
import MedicineController from './controller/MedicineController';
import DonorController from './controller/DonorController';
import MedicineBeneficiaryController from './controller/MedicineBeneficiaryController';
import PhotoController from './controller/PhotoController';

import verifyAuthentication from '../back-end/help/verifyAuthentication';
import multer from 'multer';
import multerConfig from '../config/multerConfig';

// register user and login
router.post('/register_user', RegisterUserController.register);
router.post('/login', LoginController.login);

// doar medicamentos
router.post(
  '/medicine/:user_id/register_medicine',
  verifyAuthentication,
  MedicineController.registerMedicine
);

router.get(
  '/beneficiary/show_beneficiary',
  BeneficiaryController.showMedicineBeneficiary
);

router.get('/medicine/:name', MedicineController.medicineSearch);

router.post('/donor/register_donor', DonorController.registerDonor);
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

// router.get('/', (req, res, next) => {
//   res.send('Hello Heroku');
//   next();
// });

export default router;
