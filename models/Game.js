const { Model, DataTypes } = require('sequelize');
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
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'categories',
                key: 'id'
            }
        },
        min_number_of_players: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        max_number_of_players: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avg_min_game_time: {
            type: DataTypes.RANGE,
            allowNull: false
        },
        avg_max_game_time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        game_description: {
            type: DataTypes.STRING(1234),
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored:true,
        modelName: 'game'
    }
);

module.exports = Game;