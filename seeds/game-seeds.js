const { model } = require("../config/connection");
const{ Game} = require("../models");


const gameData = [
    {
        game_name: "Plunder",
        category_tag: 1,
        number_of_players: 2-6,
        game_time: 40-120
    }
];

const seedGame = () => Game.bulkCreate(gameData);
model.exports = seedProducts;