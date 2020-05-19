import Sequelize from 'sequelize';
import databaseConfig from '../config/databaseConfig';
import Medicine from '../back-end/model/MedicineModel';
import Donor from '../back-end/model/DonorModel';
import DonorMedicine from '../back-end/model/DonorMedicineModel';
import BeneficiaryModel from '../back-end/model/BeneficiaryModel';

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

Medicine.init(connection);
Donor.init(connection);
DonorMedicine.init(connection);
BeneficiaryModel.init(connection);

Medicine.belongsToMany(Donor, {
  foreignKey: 'medicine_id',
  through: 'Donor_medicine',
  as: 'donors',
});
Donor.belongsToMany(Medicine, {
  foreignKey: 'donor_id',
  through: 'Donor_medicine',
  as: 'medicines',
});

export default connection;
