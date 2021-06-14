import { Model, DataTypes } from 'sequelize';

class Donor_Medicine extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
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
