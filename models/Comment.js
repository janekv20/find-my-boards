const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    // columns go here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    // },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "user",
    //     key: "id",
    //   },
    // },
    // game_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: "game",
    //     key: "id",
    //   },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
