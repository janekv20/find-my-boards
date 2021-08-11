const { Friends } = require("../models");

const friendsdata = [
  {
    user_id: 1,
  }
];

const seedFriends = () => Friends.bulkCreate(friendsdata);

module.exports = seedFriends;
