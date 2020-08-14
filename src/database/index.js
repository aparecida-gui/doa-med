import Sequelize from 'sequelize';
import databaseConfig from '../config/config';
import Medicine_Donation from '../back-end/model/Medicine_Donation';
import Donor from '../back-end/model/Donor';
import Donor_Medicine from '../back-end/model/Donor_Medicine';
import Beneficiary from '../back-end/model/Beneficiary';
import RegisterUser from '../back-end/model/RegisterUser';
import Medicine_Beneficiary from '../back-end/model/Medicine_Beneficiary';
import Photo from '../back-end/model/Photo';
const env = process.env.NODE_ENV || 'development';

console.log(process.env.NODE_ENV);
console.log('>>>>>>>>>>> env: ', env);
console.log(
  '>>>>>>>>>>> databaseConfig[env].use_env_variable',
  databaseConfig[env].use_env_variable
);
console.log('>>>>>>>>>>> databaseConfig: ', databaseConfig);
console.log('>>>>>>>>>>> databaseConfig.production', databaseConfig.production);
console.log(
  '>>>>>>>>>>< databaseConfig.use_env_variable: ',
  databaseConfig.use_env_variable
);

let connection;
if (process.env.NODE_ENV === 'production') {
  connection = new Sequelize(process.env.use_env_variable, databaseConfig);
  console.log('>>>>>>>>>>>>>>>>>>>> estou no if');
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
  console.log('estou no else');
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
Donor.init(connection);
Donor_Medicine.init(connection);
Medicine_Beneficiary.init(connection);
Beneficiary.init(connection);
RegisterUser.init(connection);
Photo.init(connection);

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

Photo.belongsTo(Medicine_Beneficiary, {
  foreignKey: 'medicine_beneficiary_id',
  as: 'medicine_beneficiary',
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
