import { Model, DataTypes } from 'sequelize';

class Beneficiary extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: DataTypes.STRING },
        phone: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        city: { type: DataTypes.STRING },
      },
      {
        freezeTableName: true,
        constraints: false,
        timestamps: false,
        sequelize,
      }
    );
  }
}

export default Beneficiary;
