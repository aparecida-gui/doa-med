export default {
  development: {
    dialect: 'postgres',
    host: '127.0.0.1',
    username: 'postgres',
    password: 'postgres',
    database: 'doaMed',
    define: {
      timestamps: false,
      underscored: true,
    },
  },
  production: {
    dialect: 'postgres',
    DATABASE_URL: process.env.DATABASE_URL,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
