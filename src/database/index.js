import Sequelize from 'sequelize';
import databaseConfig from '../config/databaseConfig';

const connection = new Sequelize(databaseConfig);

export default connection;
