const sequelize = require('../config/connection');
const { Categories } = require('../models');

const catData = [
    {
        category_name: "Cards"
    },
    {
        category_name: "Strategy"
    },
    {
        category_name: "Party"
    },
    {
        category_name: "Storytelling"
    },
];

const seedCategories = () => Categories.bulkCreate(catData);

module.exports = seedCategories;