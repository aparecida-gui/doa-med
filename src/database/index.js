import Sequelize from 'sequelize';
import databaseConfig from '../config/databaseConfig';
import Medicine from '../back-end/model/MedicineModel';

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

export default connection;
