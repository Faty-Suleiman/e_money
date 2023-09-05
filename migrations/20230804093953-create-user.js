"use strict";

//const { UUIDV4, DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      surname: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      othernames: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      password_salt: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM,
        values: ["Male", "Female", "Others"],
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      address_number: {
        type: Sequelize.STRING(70),
        allowNull: true,
      },
      address_street: {
        type: Sequelize.STRING(70),
        allowNull: true,
      },
      address_city: {
        type: Sequelize.STRING(70),
        allowNull: true,
      },
      address_state: {
        type: Sequelize.STRING(70),
        allowNull: true,
      },
      localgovt: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      state_of_origin: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      marital_status: {
        type: Sequelize.ENUM,
        values: ["Single", "Married", "Others"],
        allowNull: true,
        defaultValue: "Single",
      },
      nextofkin_surname: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      nextofkin_othernames: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      nextofkin_relationship: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      nextofkin_address_number: {
        type: Sequelize.STRING(70),
        allowNull: true,
      },
      nextofkin_address_street: {
        type: Sequelize.STRING(70),
        allowNull: true,
      },
      nextofkin_address_city: {
        type: Sequelize.STRING(70),
        allowNull: true,
      },
      nextofkin_address_state: {
        type: Sequelize.STRING(70),
        allowNull: true,
      },
      nin: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      bvn: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      isBvnVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isNinVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isPasswordChangeRequired: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
