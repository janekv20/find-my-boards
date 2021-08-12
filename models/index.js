// import all models
const User = require('./User');
const Rank = require('./Rank');
const Game = require('./Game');
const Categories = require('./Categories');
const Following = require('./Following');

//Game belongs to Categories
Game.belongsTo(Categories, {
    foreignKey: 'category_id'
})

//Categories has many games
Categories.hasMany(Game, {
    foreignKey: 'category_id'
})

Following.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Following, {
    foreignKey: 'user_id'
})


module.exports = { User, Rank, Game, Categories, Following };