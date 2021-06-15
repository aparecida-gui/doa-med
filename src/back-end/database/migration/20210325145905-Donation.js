'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Donation',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        idDonorMedicine: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Donor_Medicine', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        idBeneficiary: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'User', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        message: { type: Sequelize.STRING, allowNull: false },
        address: { type: Sequelize.STRING, allowNull: false },
        nameMedicine: { type: Sequelize.STRING, allowNull: false },
        quantityDonate: { type: Sequelize.INTEGER, allowNull: false },
        date: { type: Sequelize.DATEONLY, allowNull: false },
        time: { type: Sequelize.TIME, allowNull: false },
      },
      { freezeTableName: true, timestamps: false }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Donation');
  },
};
