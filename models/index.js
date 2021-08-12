// import all models
const User = require("./User");
const Rank = require("./Rank");
const Friends = require("./Friends");
const Game = require("./Game");
const Categories = require("./Categories");
const Comment = require("./Comment");

// create associations here

//Game belongs to Categories
Game.belongsTo(Categories, {
  foreignKey: "category_id",
});

//Categories has many games
Categories.hasMany(Game, {
  foreignKey: "category_id",
});

User.hasMany(Game, {
  foreignKey: "user_id",
});

Game.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(Game, {
  through: Rank,
  as: "ranks",
  foreignKey: "user_id",
});

Game.belongsToMany(User, {
  through: Rank,
  as: "ranks",
  foreignKey: "game_id",
});

Rank.belongsTo(User, {
  foreignKey: "user_id",
});

Rank.belongsTo(Game, {
  foreignKey: "game_id",
});

User.hasMany(Rank, {
  foreignKey: "user_id",
});

Game.hasMany(Rank, {
  foreignKey: "game_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Game, {
  foreignKey: "game_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Game.hasMany(Comment, {
  foreignKey: "game_id",
});

module.exports = { User, Rank, Friends, Game, Categories, Comment };
