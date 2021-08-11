const { Model, DataTypes}  = require('sequelize');
const sequelize = require('../config/connection');

class Categories extends Model{}

Categories.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'categories'
    }
);

module.exports = Categories;