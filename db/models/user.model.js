const sequelize = require("../index");
const { DataTypes, Model } = require('sequelize');

class User extends Model { }

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'users',
    freezeTableName: false,
    timestamps: true,
  },
);
module.exports = User;