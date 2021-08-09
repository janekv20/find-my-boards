const { Friends } = require("../models");

const friendsdata = [
  {
    user_id: 1,
  }
];

const seedFriends = () => Rank.bulkCreate(friendsdata);

module.exports = seedFriends;
