import Sequelize from 'sequelize';
import databaseConfig from '../config/config';
import Medicine_Donation from '../back-end/model/Medicine_Donation';
import User from '../back-end/model/User';
import Medicine_Beneficiary from '../back-end/model/Medicine_Beneficiary';
import Donation from '../back-end/model/Donation';
import ConfirmedDonation from '../back-end/model/ConfirmedDonation';
import path from 'path';
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

let connection;
if (process.env.NODE_ENV === 'production') {
  connection = new Sequelize(
    process.env.DATABASE_URL,
    databaseConfig.production
  );
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
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
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

// Tabela confirmação ou negação da doação do medicamento.
ConfirmedDonation.init(connection);

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

// um usuario pode fazer diversas doações.
// User tem os metodos de busca
User.hasMany(Donation, {
  foreignKey: 'idBeneficiary',
  constraints: 'true',
  foreignKey: 'idDonor',
  constraints: 'true',
});

// uma doação pertence apenas um usuario.
Donation.belongsTo(User, {
  foreignKey: 'idBeneficiary',
  constraints: 'true',
  foreignKey: 'idDonor',
  constraints: 'true',
});

// confirmação ou negação da medicação.
ConfirmedDonation.hasMany(Donation, {
  foreignKey: 'idDonation',
  foreignKey: 'idBeneficiary',
  foreignKey: 'idDonor',
  constraints: 'true',
});

Donation.belongsTo(ConfirmedDonation, {
  foreignKey: 'idDonation',
  foreignKey: 'idBeneficiary',
  foreignKey: 'idDonor',
  constraints: 'true',
});

export default connection;
