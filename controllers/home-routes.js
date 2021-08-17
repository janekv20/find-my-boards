const { Game, Categories } = require('../models');

const router = require('express').Router();

// When the user navigates to the home page they are sent to the index.js file which routes them to this file
// Then this file renders the homepage.handlebars template
router.get('/', (req, res) => {
  res.render('homepage',{
    title: 'Home Page',
    style: 'main.css',
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login',{
    title: 'Login',
    style: 'login.css'
  });
});

router.get('/game/:id', (req,res) => {
  Game.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'game_name',
      'category_id',
      'min_number_of_players',
      'max_number_of_players',
      'avg_min_game_time',
      'avg_max_game_time',
      'game_description'
    ],
    include: [
      {
        model: Categories,
        attributes: ['id', 'category_name']
      }
    ]
  })
  
  .then(dbGameData => {
    
  
    if(!dbGameData) {
      res.status(404).json({message: 'No game found with this id'});
      return;
    }

    const game = dbGameData.get({plain:true});
    console.log(game);
    console.log(game.category.category_name)

    res.render('single-game', {
      game
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;