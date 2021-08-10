const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Rank extends Model {}

Rank.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      references: {
        model: 'game',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'rank'
  }
);

module.exports = Rank;