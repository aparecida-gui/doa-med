import Sequelize from 'sequelize';
import databaseConfig from '../config/databaseConfig';
import MedicineDonationModel from '../back-end/model/MedicineDonationModel';
import Donor from '../back-end/model/DonorModel';
import DonorMedicineModel from '../back-end/model/DonorMedicineModel';
import BeneficiaryModel from '../back-end/model/BeneficiaryModel';
import MedicineBeneficiaryModel from '../back-end/model/MedicineBeneficiaryModel';

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
    freezeTableName: true,
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

MedicineDonationModel.init(connection);
Donor.init(connection);
DonorMedicineModel.init(connection);
BeneficiaryModel.init(connection);
MedicineBeneficiaryModel.init(connection);

MedicineDonationModel.belongsToMany(Donor, {
  foreignKey: 'medicine_donation_id',
  through: 'Donor_Medicine',
  as: 'donors',
});
Donor.belongsToMany(MedicineDonationModel, {
  foreignKey: 'donor_id',
  through: 'Donor_Medicine',
  as: 'medicines',
});

BeneficiaryModel.belongsToMany(MedicineBeneficiaryModel, {
  foreignKey: 'medicine_beneficiary_id',
  through: 'Medicine_Beneficiary',
  as: 'medicinesBeneficiary',
});
MedicineBeneficiaryModel.belongsToMany(BeneficiaryModel, {
  foreignKey: 'beneficiary_id',
  through: 'Medicine_Beneficiary',
  as: 'beneficiaries',
});

export default connection;
