const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Followship extends Model { }

Followship.init(
  {
    follower_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    followee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: 'followship'
  }
);

module.exports = Followship;