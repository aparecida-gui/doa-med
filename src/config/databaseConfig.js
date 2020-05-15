const configDatabase = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'postgres',
  password: 'postgres',
  database: 'doaMed',
  define: {
    timestamps: true,
    underscored: true,
  },
};

module.exports = configDatabase;
