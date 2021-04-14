'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Medicine_Donation',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        expirationDate: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        laboratory: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        status: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
      },
      { freezeTableName: true, timestamps: false }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Medicine_Donation');
  },
};
