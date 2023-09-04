'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     //define association here
    Transaction.belongsTo(models.User, {
       foreignKey: "user_id",
  
    })
}
    
  }
  Transaction.init(
    {
      transaction_id: DataTypes.UUID,
      user_id: DataTypes.UUID,
      transaction_type: DataTypes.ENUM("credit", "debit"),
      transaction_status: DataTypes.ENUM("pending", "completed", "failed"),
      comment: DataTypes.TEXT,
      amount: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};