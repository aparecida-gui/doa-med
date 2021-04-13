'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Contact_Donor',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        idBeneficiary: {
          type: Sequelize.INTEGER,
          foreignKey: true,
          constraints: true,
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        idDonor: {
          type: Sequelize.INTEGER,
          foreignKey: true,
          constraints: true,
          allowNull: false,
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
    return queryInterface.dropTable('Contact_Donor');
  },
};
