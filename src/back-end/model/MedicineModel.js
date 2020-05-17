import { Model, DataTypes } from 'sequelize';

class Medicine extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: DataTypes.STRING },
        expirationDate: { type: DataTypes.DATEONLY },
        quantity: { type: DataTypes.INTEGER },
        laboratory: { type: DataTypes.STRING },
      },
      {
        freezeTableName: true,
        timestamps: false,
        sequelize,
      }
    );
  }
}

export default Medicine;
