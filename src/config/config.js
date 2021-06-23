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
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: 'false',
      },
    },
  },
};
