'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Comment.init({
    comment_id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    name: DataTypes.STRING,
    message: DataTypes.TEXT,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};