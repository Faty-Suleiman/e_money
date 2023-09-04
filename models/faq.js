'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Faq.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
    }
  }
  Faq.init({
    faq_id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Faq',
  });
  return Faq;
};