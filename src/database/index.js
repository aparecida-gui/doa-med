import Sequelize from 'sequelize';
import databaseConfig from '../config/config';
import Medicine_Donation from '../back-end/model/Medicine_Donation';
import Donor_Medicine from '../back-end/model/Donor_Medicine';
import RegisterUser from '../back-end/model/RegisterUser';
import Medicine_Beneficiary from '../back-end/model/Medicine_Beneficiary';
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

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

Medicine_Donation.init(connection);
Donor_Medicine.init(connection);
Medicine_Beneficiary.init(connection);
RegisterUser.init(connection);

Medicine_Donation.belongsToMany(RegisterUser, {
  foreignKey: 'medicine_donation_id',
  through: 'Donor_Medicine',
  as: 'donors',
});
RegisterUser.belongsToMany(Medicine_Donation, {
  foreignKey: 'user_id',
  through: 'Donor_Medicine',
  as: 'medicines',
});

Medicine_Beneficiary.belongsToMany(RegisterUser, {
  foreignKey: 'medicine_id',
  through: 'Beneficiary_Medicine',
  as: 'beneficiaries',
});
RegisterUser.belongsToMany(Medicine_Beneficiary, {
  foreignKey: 'beneficiary_id',
  through: 'Beneficiary_Medicine',
  as: 'medicinesBeneficiary',
});

export default connection;
