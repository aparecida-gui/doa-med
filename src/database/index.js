import Sequelize from 'sequelize';
import databaseConfig from '../config/databaseConfig';
import Medicine_Donation from '../back-end/model/Medicine_Donation';
import Donor from '../back-end/model/Donor';
import Donor_Medicine from '../back-end/model/Donor_Medicine';
import Beneficiary from '../back-end/model/Beneficiary';
import Medicine_Beneficiary from '../back-end/model/Medicine_Beneficiary';

const connection = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    timestamps: false,
  }
);

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

Medicine_Donation.init(connection);
Donor.init(connection);
Donor_Medicine.init(connection);
Medicine_Beneficiary.init(connection);
Beneficiary.init(connection);

Medicine_Donation.belongsToMany(Donor, {
  foreignKey: 'medicine_donation_id',
  through: 'Donor_Medicine',
  as: 'donors',
});
Donor.belongsToMany(Medicine_Donation, {
  foreignKey: 'donor_id',
  through: 'Donor_Medicine',
  as: 'medicines',
});

Medicine_Beneficiary.belongsToMany(Beneficiary, {
  foreignKey: 'medicine_id',
  through: 'Beneficiary_Medicine',
  as: 'beneficiaries',
});
Beneficiary.belongsToMany(Medicine_Beneficiary, {
  foreignKey: 'beneficiary_id',
  through: 'Beneficiary_Medicine',
  as: 'medicinesBeneficiary',
});

export default connection;
