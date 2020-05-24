import { Model, DataTypes } from 'sequelize';

class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: DataTypes.BLOB },
      },
      {
        freezeTableName: true,
        timestamps: false,
        sequelize,
      }
    );
  }
}

export default Photo;
