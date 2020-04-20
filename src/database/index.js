import Sequelize from 'sequelize';
import databaseConfig from '../config/databaseConfig';

const connection = new Sequelize(databaseConfig);
console.log('file index.js');

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

connection.close();

export default connection;
