const { Model, DataTypes } = require('sequelize');
// const { model } = require('../config/connection');
const sequelize = require('../config/connection');

class Game extends Model {}

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        game_name: {
            type: DataTypes.STRING,
            allowNull: false,    
        },
        category_tag: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number_of_players: {
            type: DataTypes.RANGE,
            allowNull: false
        },
        game_time: {
            type: DataTypes.RANGE,
            allowNull: false
        }
    }
)

model.exports = Game;