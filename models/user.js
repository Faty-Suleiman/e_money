'use strict';
const {
  Model
} = require('sequelize');
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
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      dob: DataTypes.STRING,
      gender: DataTypes.ENUM,
      phone: DataTypes.STRING,
      address_number: DataTypes.STRING,
      address_street: DataTypes.STRING,
      address_city: DataTypes.STRING,
      address_state: DataTypes.STRING,
      localgovt: DataTypes.STRING,
      stateOfOringin: DataTypes.STRING,
      marital_status: DataTypes.ENUM,
      nextofkin_surname: DataTypes.STRING,
      nextofkin_othernames: DataTypes.STRING,
      nextofkin_relationship: DataTypes.STRING,
      nextofkin_number: DataTypes.STRING,
      nextofkin_street: DataTypes.STRING,
      nextofkin_city: DataTypes.STRING,
      nextofkin_state: DataTypes.STRING,
      bvn: DataTypes.STRING,
      isBvnVerified: DataTypes.BOOLEAN,
      isNinVerified: DataTypes.BOOLEAN,
      isPasswordChangeRequired: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};