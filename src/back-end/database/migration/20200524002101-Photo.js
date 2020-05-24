'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Photo',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: { type: Sequelize.BLOB, allowNull: false },
        medicine_beneficiary_id: {
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
    return queryInterface.dropTable('Photo');
  },
};
