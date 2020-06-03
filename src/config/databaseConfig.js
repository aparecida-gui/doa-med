import dotenv from 'dotenv';
dotenv.config();

const configDatabase = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'postgres',
  password: 'postgres',
  database: 'doaMed',
  url: process.env.DATABASE_URL,
  define: {
    timestamps: false,
    underscored: true,
  },
};

module.exports = configDatabase;
