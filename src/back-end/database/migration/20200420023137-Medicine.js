'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Medicine',
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
      },
      { freezeTableName: true, timestamps: false }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Medicine');
  },
};
