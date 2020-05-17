import { Model, DataTypes } from 'sequelize';

class DonorMedicine extends Model {
  static init(sequelize) {
    super.init(
      {
        donor_id: { type: DataTypes.INTEGER },
        medicine_id: { type: DataTypes.INTEGER },
      },
      {
        freezeTableName: true,
        timestamps: false,
        sequelize,
      }
    );
  }
}

export default DonorMedicine;
