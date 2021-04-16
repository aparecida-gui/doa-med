import { Model, DataTypes } from 'sequelize';

class Donor_Medicine extends Model {
  static init(sequelize) {
    super.init(
      {
        idDonor: { type: DataTypes.INTEGER },
        idDonationMedicine: { type: DataTypes.INTEGER },
      },
      {
        freezeTableName: true,
        timestamps: false,
        sequelize,
      }
    );
  }
}

export default Donor_Medicine;
