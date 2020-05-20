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
        donor_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Donor', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        medicine_donation_id: {
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
