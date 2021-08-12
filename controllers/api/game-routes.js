const router = require('express').Router();
const { Categories, Game} = require('../../models');

//get games
router.get('/', (req, res) => {
    Game.findAll({
        
    })
})