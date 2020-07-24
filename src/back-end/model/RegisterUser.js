import { Model, DataTypes } from 'sequelize';

class RegisterUser extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: DataTypes.STRING },
        phone: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        city: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
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

export default RegisterUser;
