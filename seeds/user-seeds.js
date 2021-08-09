const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
  {
    username: 'jibberish',
    email: 'jibberish@jibberish.com',
    password: 'jibberish123'
  },
]

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;