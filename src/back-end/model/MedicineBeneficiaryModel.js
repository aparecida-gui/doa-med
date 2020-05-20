import { Model, DataTypes } from 'sequelize';

class MedicineBeneficiary extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: DataTypes.STRING },
        quantity: { type: DataTypes.INTEGER },
      },
      {
        freezeTableName: true,
        timestamps: false,
        sequelize,
      }
    );
  }
}

export default MedicineBeneficiary;
