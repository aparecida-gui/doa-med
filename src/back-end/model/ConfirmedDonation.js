import { Model, DataTypes } from 'sequelize';

class ConfirmedDonation extends Model {
  static init(sequelize) {
    super.init(
      {
        idBeneficiary: { type: DataTypes.INTEGER },
        idDonor: { type: DataTypes.INTEGER },
        idDonation: { type: DataTypes.INTEGER },
        donorConfirm: { type: DataTypes.BOOLEAN },
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

export default ConfirmedDonation;
