import pkg from 'sequelize';
const { Model, DataTypes } = pkg;

class Medicine_Donation extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: DataTypes.STRING },
        expirationDate: { type: DataTypes.DATEONLY },
        quantity: { type: DataTypes.INTEGER },
        laboratory: { type: DataTypes.STRING },
        status: { type: DataTypes.BOOLEAN, defaultValue: true },
      },
      {
        freezeTableName: true,
        timestamps: false,
        sequelize,
      }
    );
  }
}

export default Medicine_Donation;
