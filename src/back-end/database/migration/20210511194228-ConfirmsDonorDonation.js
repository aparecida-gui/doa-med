'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'ConfirmsDonorDonation',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        idDonor: {
          type: Sequelize.INTEGER,
          foreignKey: true,
          constraints: true,
          allowNull: false,
          references: { model: 'User', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        idDonation: {
          type: Sequelize.INTEGER,
          foreignKey: true,
          constraints: true,
          allowNull: true,
          references: { model: 'Donation', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        donorConfirm: { type: Sequelize.BOOLEAN },
      },
      { freezeTableName: true, timestamps: false }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ConfirmsDonorDonation');
  },
};
