const seedUsers = require('./user-seeds');
const seedrank = require('./rank-seeds');
const seedfriends = require('./friends-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedrank();
  console.log('--------------');

  await seedfriends();
  console.log('--------------');

  process.exit(0);
};

seedAll();