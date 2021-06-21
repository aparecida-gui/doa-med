import pkg from 'sequelize';
const { Model, DataTypes } = pkg;

class Medicine_Beneficiary extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: DataTypes.STRING },
        quantity: { type: DataTypes.INTEGER },
        prescription: { type: DataTypes.BLOB },
      },
      {
        freezeTableName: true,
        timestamps: false,
        sequelize,
      }
    );
  }
}

export default Medicine_Beneficiary;
