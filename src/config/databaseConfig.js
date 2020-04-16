databaseConfig = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'doaMed',
  define: {
    timestamps: true,
    underscored: true,
  },
};

export default databaseConfig;
