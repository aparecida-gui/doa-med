import { Model, DataTypes } from 'sequelize';

class Donor_Medicine extends Model {
  static init(sequelize) {
    super.init(
      {
        donor_id: { type: DataTypes.INTEGER },
        medicine_donation_id: { type: DataTypes.INTEGER },
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
