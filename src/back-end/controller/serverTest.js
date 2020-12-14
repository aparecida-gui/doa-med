const express = require('express');
const app = express();
app.use(express.json());

import db from '../../../src/database';

db.sync()
  .then(() => {
    server();
  })
  .catch((err) => {
    console.log('>>>> Err database : ', err);
  });

import RegisterUserController from './RegisterUserController';
import LoginController from './LoginController';
import MedicineController from './MedicineController';

import MedicineBeneficiaryController from './MedicineBeneficiaryController';

import BeneficiaryController from './BeneficiaryController';

import DonorController from './DonorController';

import ViewRegisteredMedicationsController from './ViewRegisteredMedicationsController';

import MedicineDonationController from './MedicineDonationController';
import multer from 'multer';
import multerConfig from '../../config/multerConfig';

// rota para o doador cadastrar o medicamento
// que quer doar.
app.post(
  '/register_medicine/donor/:donor_id',
  MedicineDonationController.registerMedicineDonor
);

// rota para registrar usuários.
app.post('/register_user', RegisterUserController.register);

// rota de login
app.post('/', LoginController.login);

// rota mostra os medicamentos dispoíveis para doação ou não.
app.get('/medicine/:name', MedicineController.medicineSearch);

// rota para o beneficiario adicionar
// o medicamento e a imagem da receita medica.
app.post(
  '/:beneficiary_id/register_medicine_benef',
  multer(multerConfig).single('prescription'),
  MedicineBeneficiaryController.registerMedicineBeneficiary
);

// rota mostra os dados do beneficiario logado
// e os medicamentos que ele tem cadastrados.
app.get(
  '/:beneficiary_id/view_register_medicines',
  multer(multerConfig).single('prescription'),
  ViewRegisteredMedicationsController.showData
);

app.get(
  '/beneficiary/show_beneficiary',
  BeneficiaryController.showMedicineBeneficiary
);

app.post('/donor/register_donor', DonorController.registerDonor);

const server = () => {
  app.listen(3030, () => {
    console.log('server run');
  });
};

export default app;
