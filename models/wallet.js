'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wallet.belongsTo(models.User, {
       foreignKey: "user_id",
    })
  
    Wallet.belongsTo(models.Transaction, {
       foreignKey: "transaction_id",
    })
  }
}
  Wallet.init({
    wallet_id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    transaction_id:DataTypes.UUID,
    amount_before: DataTypes.DOUBLE,
    amount_after: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};