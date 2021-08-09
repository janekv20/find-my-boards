const { Rank } = require("../models");

const rankdata = [
  {
    game_id: 1,
    user_id: 1,
  },
];

const seedVotes = () => Rank.bulkCreate(rankdata);

module.exports = seedVotes;
