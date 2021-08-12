const router = require('express').Router();
const { Categories, Game} = require('../../models');

//get categories
router.get('/', (req,res) => {
    // console.log(res)
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

//GET /api/categories/1
router.get('/:id', (req,res) => {
    Categories.findOne({
        where: {
            id: req.params.id
        },
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

//create category
router.post('/',(req,res) => {
    Categories.create({
        category_name: req.body.category_name
    })
    .then(dbCatData => res.json(dbCatData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }); 
});

//update category
router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Categories.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(dbCatData => res.json(dbCatData)) 
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete category
router.delete('/:id', (req,res) => {
    Categories.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCatData => res.json(dbCatData))
    .catch(err => {
        res.status(500).json(err);
    })
})


module.exports = router;