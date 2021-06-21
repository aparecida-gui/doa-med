import pkg from 'sequelize';
const { Model, DataTypes } = pkg;

class ConfirmsDonorDonation extends Model {
  static init(sequelize) {
    super.init(
      {
        idDonor: { type: DataTypes.INTEGER },
        idDonation: { type: DataTypes.INTEGER },
        donorConfirm: { type: DataTypes.BOOLEAN },
      },
      {
        freezeTableName: true,
        timestamps: false,
        sequelize,
      }
    );
  }
}

export default ConfirmsDonorDonation;
