"use strict";
const { Model } = require("sequelize");
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
      user_id: DataTypes.UUID, //no bracket after the uuid
      surname: DataTypes.STRING,
      othernames: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      password_salt: DataTypes.STRING,
      dob: DataTypes.STRING,
      gender: DataTypes.ENUM("Male", "Female", "Others"),
      phone: DataTypes.STRING,
      address_number: DataTypes.STRING,
      address_street: DataTypes.STRING,
      address_city: DataTypes.STRING,
      address_state: DataTypes.STRING,
      localgovt: DataTypes.STRING,
      state_of_origin: DataTypes.STRING,
      marital_status: DataTypes.ENUM("Single", "Married", "Others"),
      nextofkin_surname: DataTypes.STRING,
      nextofkin_othernames: DataTypes.STRING,
      nextofkin_relationship: DataTypes.STRING,
      nextofkin_address_number: DataTypes.STRING,
      nextofkin_address_street: DataTypes.STRING,
      nextofkin_address_city: DataTypes.STRING,
      nextofkin_address_state: DataTypes.STRING,
      nin: DataTypes.STRING, //you did;nt put nin here and it is a required filed on db
      bvn: DataTypes.STRING,
      isBvnVerified: DataTypes.BOOLEAN,
      isNinVerified: DataTypes.BOOLEAN,
      isPasswordChangeRequired: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
