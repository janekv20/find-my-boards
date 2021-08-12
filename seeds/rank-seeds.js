const { Rank } = require("../models");

const rankdata = [
  {
    game_id: 1,
    user_id: 1,
  },
  {
    game_id: 2,
    user_id: 2,
  },
  {
    game_id: 3,
    user_id: 3,
  },  {
    game_id: 4,
    user_id: 4,
  },  {
    game_id: 5,
    user_id: 5,
  },
];

const seedVotes = () => Rank.bulkCreate(rankdata);

module.exports = seedVotes;
