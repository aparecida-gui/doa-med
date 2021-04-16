'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Beneficiary_Medicine',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        idBeneficiary: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'User', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        idMedicine: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Medicine_Beneficiary', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      { freezeTableName: true, timestamps: false }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Beneficiary_Medicine');
  },
};
