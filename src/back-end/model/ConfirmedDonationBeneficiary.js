import pkg from 'sequelize';
const { Model, DataTypes } = pkg;

class ConfirmedDonationBeneficiary extends Model {
  static init(sequelize) {
    super.init(
      {
        idBeneficiary: { type: DataTypes.INTEGER },
        idDonation: { type: DataTypes.INTEGER },
        beneficiaryConfirm: { type: DataTypes.BOOLEAN },
      },
      {
        freezeTableName: true,
        timestamps: false,
        sequelize,
      }
    );
  }
}

export default ConfirmedDonationBeneficiary;
