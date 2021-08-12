const seedUsers = require('./user-seeds');
const seedrank = require('./rank-seeds');
const seedGame = require('./game-seeds')
const seedCat = require('./categories-seeds')

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('-------DATABASE SYNCED-------');

  await seedCat();
  console.log('-------CATEGORIES SEEDED------');

  await seedGame();
  console.log('------GAMES SEEDED-------');

  await seedUsers();
  console.log('------USERS SEEDED--------');

  await seedrank();
  console.log('-------RANK SEEDED-------');

  process.exit(0);
};

seedAll();