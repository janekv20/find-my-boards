const { Rank } = require("../models");

const rankdata = [
  {
    game_id: 1,
    user_id: 1,
  },
  {
    game_id: 1,
    user_id: 10,
  },
  {
    game_id: 1,
    user_id: 8,
  },
  {
    game_id: 1,
    user_id: 4,
  },
  {
    game_id: 2,
    user_id: 2,
  },
  {
    game_id: 2,
    user_id: 15,
  },
  {
    game_id: 2,
    user_id: 14,
  },
  {
    game_id: 2,
    user_id: 13,
  },
  {
    game_id: 3,
    user_id: 16,
  },
  {
    game_id: 3,
    user_id: 17,
  },
  {
    game_id: 3,
    user_id: 3,
  },
  {
    game_id: 4,
    user_id: 4,
  },
  {
    game_id: 5,
    user_id: 5,
  },
  {
    game_id: 5,
    user_id: 4,
  },
  {
    game_id: 5,
    user_id: 3,
  },
];

const seedVotes = () => Rank.bulkCreate(rankdata);

module.exports = seedVotes;
