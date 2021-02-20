'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: { type: DataTypes.STRING(80), unique: true, allowNull: false },
      password: { type: DataTypes.STRING(255), allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
