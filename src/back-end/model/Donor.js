import { Model, DataTypes } from 'sequelize';

class Donor extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: DataTypes.STRING },
        phone: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        city: { type: DataTypes.STRING },
        observations: { type: DataTypes.TEXT },
      },
      {
        freezeTableName: true,
        timestamps: false,
        sequelize,
      }
    );
  }
}

export default Donor;
