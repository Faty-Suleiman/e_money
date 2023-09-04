'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Wallets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      wallet_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      user_id:{
        type: Sequelize.UUID,
        allowNull: false,
      },
      transaction_id:{
        type: Sequelize.UUID,
        allowNull: false,
      },
      amount_before: {
        type: Sequelize.DOUBLE(10,2),
        allowNull: false,
        defaultValue: 0
      },
      amount_after: {
        type: Sequelize.DOUBLE(10,2),
        allowNull: false,
        defaultValue: 0
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
    await queryInterface.dropTable('Wallets');
  }
};