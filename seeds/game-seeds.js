const { model } = require("../config/connection");
const{ Game } = require("../models");


const gameData = [
    {
        title: 'plunder',
        category_tag: "gambiling",
        number_of_players: 6,
        game_time: 120
    }
];

const seedGame = () => Game.bulkCreate(gameData);
module.exports = seedGame;