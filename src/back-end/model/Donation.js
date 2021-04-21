import { Model, DataTypes } from 'sequelize';

class Donation extends Model {
  static init(sequelize) {
    super.init(
      {
        message: { type: DataTypes.STRING },
        address: { type: DataTypes.STRING },
        nameMedicine: { type: DataTypes.STRING },
        quantityDonate: { type: DataTypes.INTEGER },
        date: { type: DataTypes.DATE },
        time: { type: DataTypes.TIME },
        idBeneficiary: { type: DataTypes.INTEGER },
        idDonor: { type: DataTypes.INTEGER },
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
