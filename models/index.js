// import all models
const User = require('./User');
const Rank = require('./Rank');
const Friends = require('./Friends');
const Game = require('./Game');
const Categories = require('./Categories');
const Following = require('./Following');


// // create associations here
// User.hasMany(Friends, {
//     foreignKey: 'user_id'
// })

// Friends.hasMany(User, {
//     foreignKey: 'user_id'
// })

// User.hasOne(Following, {
//     foreignKey: 'user_id'
// })

// Following.hasMany(User, {
//     foreignKey: 'user_id'
// })

module.exports = { User, Rank, Friends, Game, Categories, Following };