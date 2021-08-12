const router = require('express').Router();
const { Categories, Game} = require('../../models');

//get categories
router.get('/', (req,res) => {
    console.log(res)
    Categories.findAll({
        include: {
            model: Game,
            attributes: ['id','game_name','min_number_of_players','min_number_of_players','max_number_of_players','avg_min_game_time','avg_max_game_time','game_description']
        }
    })
    .then(dbCatData => res.json(dbCatData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

