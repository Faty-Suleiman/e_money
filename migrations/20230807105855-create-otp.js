'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Otps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      otp_id: {
         primaryKey: true,
         type: Sequelize.UUID,
         allowNull: true
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: false
      },
      otp_type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 0
      },
      email_or_phone: {
         type: Sequelize.STRING,
         allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Otps');
  }
};