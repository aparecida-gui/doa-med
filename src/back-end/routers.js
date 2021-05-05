import express from 'express';
const router = express.Router();

import UserController from './controller/User';
import LoginController from './controller/LoginController';
import MedicineController from './controller/MedicineController';
import MedicineBeneficiaryController from './controller/MedicineBeneficiaryController';
import ViewRegisteredMedicationsController from './controller/ViewRegisteredMedicationsController';
import verifyAuthentication from '../back-end/help/verifyAuthentication';
import multer from 'multer';
import multerConfig from '../config/multerConfig';
import MedicineDonationController from './controller/MedicineDonationController';
import DonationController from './controller/DonationController';

// rota para o doador cadastrar o medicamento
// que quer doar.
router.post(
  '/register_medicine/donor/:donor_id',
  MedicineDonationController.registerMedicineDonor
);

// rota para registrar usuários.
router.post('/register_user', UserController.register);

// rota de login
router.post('/', LoginController.login);

// rota mostra os medicamentos dispoíveis para doação ou não.
router.get('/medicine/:name', MedicineController.medicineSearch);

// rota para o beneficiario adicionar
// o medicamento e a imagem da receita medica.
router.post(
  '/register_medicine_benef/:beneficiary_id',
  multer(multerConfig).single('prescription'),
  MedicineBeneficiaryController.registerMedicineBeneficiary
);

// rota mostra os dados do beneficiario logado
// e os medicamentos que ele tem cadastrados.
router.get(
  '/view_register_medicines/:beneficiary_id',
  multer(multerConfig).single('prescription'),
  ViewRegisteredMedicationsController.showData
);

// rota onde o beneficiario entre em contado com
// o doador.
router.post(
  '/contact_donor/notification/:donor_id',
  DonationController.setDonation
);

// rota que mostra as doações agendadas
// do usuario.
router.get('/notification/:user_id', DonationController.getDonation);

// rota manda notificação para o doador e beneficiario
// para a doação agendada no dia atual.
router.get(
  '/have_donation/:user_id',
  DonationController.haveDonationScheduledToday
);

// Apos a data agendada para a doação é verificado
// se a doação aconteceu.
router.get('/check_donation/:user_id', DonationController.checkDonation);

// rota de confirmação ou negação da doação.
router.post(
  '/confirm_donantion/beneficiary',
  DonationController.confirmDonation
);

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
