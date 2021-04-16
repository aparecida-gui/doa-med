'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Donor_Medicine',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        idDonor: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'User', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        idDonationMedicine: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Medicine_Donation', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      { freezeTableName: true, timestamps: false }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Donor_Medicine');
  },
};
