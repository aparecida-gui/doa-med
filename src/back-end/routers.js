import express from 'express';
const router = express.Router();

import RegisterUserController from './controller/RegisterUserController';
import LoginController from './controller/LoginController';
import BeneficiaryController from './controller/BeneficiaryController';
import MedicineController from './controller/MedicineController';
import DonorController from './controller/DonorController';
import MedicineBeneficiaryController from './controller/MedicineBeneficiaryController';
import ViewRegisteredMedicationsController from './controller/ViewRegisteredMedicationsController';
import verifyAuthentication from '../back-end/help/verifyAuthentication';
import multer from 'multer';
import multerConfig from '../config/multerConfig';

// rota para registrar usuários.
router.post('/register_user', RegisterUserController.register);

// rota de login
router.post('/', LoginController.login);

// rota para adicionar os medicamentos dísponíveis para doação.
router.post('/medicine/register_medicine', MedicineController.registerMedicine);

// rota mostra os medicamentos dispoíveis para doação ou não.
router.get('/medicine/:name', MedicineController.medicineSearch);

// rota para o beneficiario adicionar o medicamento e a imagem da receita medica.
router.post(
  '/:beneficiary_id/register_medicine_benef',
  multer(multerConfig).single('prescription'),
  MedicineBeneficiaryController.registerMedicineBeneficiary
);

// rota mostra os dados do beneficiario logado e os medicamentos que ele tem cadastrados.
router.get(
  '/:beneficiary_id/view_register_medicines',
  multer(multerConfig).single('prescription'),
  ViewRegisteredMedicationsController.showData
);

router.get(
  '/beneficiary/show_beneficiary',
  BeneficiaryController.showMedicineBeneficiary
);

router.post('/donor/register_donor', DonorController.registerDonor);

// router.post(
//   '/medicine/:medicine_beneficiary_id/photo',
//   multer(multerConfig).single('name'),
//   PhotoController.AddPhoto
// );

// router.get('/photo', PhotoController.showPhoto);

// router.get('/', (req, res, next) => {
//   res.send('Hello Heroku');
//   next();
// });

export default router;
