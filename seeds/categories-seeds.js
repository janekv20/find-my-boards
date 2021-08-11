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
    {
        category_name: "Gambling"
    },
];

const seedCat = () => Categories.bulkCreate(catData);

module.exports = seedCat;