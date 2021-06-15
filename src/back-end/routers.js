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

// rota para doar medicamento.
router.post(
  '/register_medicine/donor/:donor_id',
  MedicineDonationController.registerMedicineDonor
);

// rota para registrar usuários.
router.post('/register_user', UserController.register);

// rota para fazer login.
router.post('/', LoginController.login);

// rota para consultas medicamentos dispoíveis para doação ou não.
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

// rota onde o beneficiario entra em contato com o doador.
router.post(
  '/contact_donor/notification/:donor_id',
  DonationController.setDonation
);

// TODO: verificar esta rota.
// rota que mostra as doações agendadas do usuario.
router.get('/notification/:user_id', DonationController.getDonation);

// rota manda notificação para o doador e beneficiario
// para a doação agendada no dia atual.
router.get(
  '/have_donation/:user_id',
  DonationController.haveDonationScheduledToday
);

// TODO: verificar esta rota.
// Passada a data do agendamento da doação é verificado se a doação aconteceu
router.get('/check_donation/:user_id', DonationController.checkDonation);

// TODO: verificar esta rota.
// rota de confirmação ou negação da doação.
router.post('/confirm_donantion/:user_id', DonationController.verifyUser);

// rota em que é passado o id do medicamento doado e o id do doador.
// é devolvido o id correspondente na tabela Donor_Medicine.
router.post('/medicine_donor', DonationController.donorMedicine);

export default router;
