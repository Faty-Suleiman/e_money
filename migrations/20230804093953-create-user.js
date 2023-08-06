'use strict';

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
        type: Sequelize.STRING,
        allowNull: false,
      },
      othernames: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password_salt: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM,
        values: ["Male", "Female", "Others"],
        allowNull: false,
      },
      dob: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      localgovt: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state_of_origin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      marital_status: {
        type: Sequelize.ENUM,
        values: ["Single", "Married", "Others"],
        allowNull: true,
      },
      nextofkin_surname: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nextofkin_othernames: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nextofkin_relationship: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nextofkin_address_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nextofkin_address_street: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nextofkin_address_city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nextofkin_address_state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bvn: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isBvnVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      isNinVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      isPasswordChangeRequired: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
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
    await queryInterface.dropTable('Users');
  }
};