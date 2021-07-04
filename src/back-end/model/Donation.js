import pkg from 'sequelize';
const { Model, DataTypes } = pkg;

class Donation extends Model {
  static init(sequelize) {
    super.init(
      {
        message: { type: DataTypes.STRING },
        address: { type: DataTypes.STRING },
        nameMedicine: { type: DataTypes.STRING },
        quantityDonate: { type: DataTypes.INTEGER },
        date: { type: DataTypes.DATEONLY },
        time: { type: DataTypes.TIME },
        idDonorMedicine: { foreignKey: true, type: DataTypes.INTEGER },
        idBeneficiary: { foreignKey: true, type: DataTypes.INTEGER },
      },
      {
        freezeTableName: true,
        timestamps: false,
        sequelize,
      }
    );
  }
}

export default Donation;
