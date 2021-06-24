import Sequelize from 'sequelize';
import databaseConfig from '../config/config.js';
import Medicine_Donation from '../back-end/model/Medicine_Donation.js';
import User from '../back-end/model/User.js';
import Medicine_Beneficiary from '../back-end/model/Medicine_Beneficiary.js';
import Donation from '../back-end/model/Donation.js';
import ConfirmedDonationBeneficiary from '../back-end/model/ConfirmedDonationBeneficiary.js';
import ConfirmsDonorDonation from '../back-end/model/ConfirmsDonorDonation.js';
import DonorMedicine from '../back-end/model/Donor_Medicine.js';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config(path.resolve('../../.env'));

let connection;

if (process.env.NODE_ENV === 'production') {
  connection = new Sequelize(process.env.DATABASE_URL);
}
if (process.env.NODE_ENV === 'development') {
  connection = new Sequelize(
    databaseConfig.development.database,
    databaseConfig.development.username,
    databaseConfig.development.password,
    {
      host: databaseConfig.development.host,
      dialect: databaseConfig.development.dialect,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
      timestamps: false,
    }
  );
}

test: {
  connection = new Sequelize(
    databaseConfig.development.database,
    databaseConfig.development.username,
    databaseConfig.development.password,
    {
      host: databaseConfig.development.host,
      dialect: databaseConfig.development.dialect,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
      timestamps: false,
    }
  );
}

connection
  .authenticate()
  .then(() => {
    console.log(
      '>>>>>>> Connection has been established successfully database >>>>>>>'
    );
  })
  .catch((err) => {
    console.error('>>>>> Unable to connect to the database >>>>>>>', err);
  });

// tabela para o doador cadastrar
// o medicamento que deseja doar.
Medicine_Donation.init(connection);

// tabela para o beneficiario cadastrar o medicamento
// que precisa.
Medicine_Beneficiary.init(connection);

// tabela para cadastrar beneficiarios e doadores.
User.init(connection);

// tabela onde fica os registros da marcação para
// a doação.
Donation.init(connection);

DonorMedicine.init(connection);

// Tabela confirmação ou negação da doação do medicamento.
ConfirmedDonationBeneficiary.init(connection);

ConfirmsDonorDonation.init(connection);

Medicine_Donation.belongsToMany(User, {
  foreignKey: 'idDonationMedicine',
  through: 'Donor_Medicine',
  as: 'donors',
});

User.belongsToMany(Medicine_Donation, {
  foreignKey: 'idDonor',
  through: 'Donor_Medicine',
  as: 'medicines',
});

Medicine_Beneficiary.belongsToMany(User, {
  foreignKey: 'idMedicine',
  through: 'Beneficiary_Medicine',
  as: 'beneficiaries',
});

User.belongsToMany(Medicine_Beneficiary, {
  foreignKey: 'idBeneficiary',
  through: 'Beneficiary_Medicine',
  as: 'medicinesBeneficiary',
});

Donation.belongsTo(DonorMedicine, {
  foreignKey: 'idDonorMedicine',
  constraints: true,
});

DonorMedicine.hasMany(Donation, {
  foreignKey: 'idDonorMedicine',
  constraints: true,
});

export default connection;
