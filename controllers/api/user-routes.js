const router = require('express').Router();
const { User, Rank, Friends, Following } = require('../../models');

// get users
router.get('/', (req, res) => {
  // access our user model and run .findAll() method)
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Friends,
        attributes: ['id'],
        include: {
          model: User,
          attributes: ['user_id', 'username']
        }
      },
      {
        model: Following,
        attributes: ['id'],
        include: {
          model: User,
          attributes: ['user_id', 'username']
        }
      }
    ]
    // include: [
    //     // games and all it's attributes
    //     {
    //         model: Game,
    //         attributes: ['id', 'game_name', 'category_tag', 'number_of_players', 'game_time']
    //     },
    //     // friends their and all it's attributes
    //     {
    //         model: Friends,
    //         attributes: ['id'] //need to figure out how to bring in username with sequelize
    //     },
    //     // comments and all their attributes and include game names they commented on
    //     // games attribute name through rank as ranked games
    //     {
    //         model: Game,
    //         attributes: ['game_name'],
    //         through: Rank,
    //         as: 'ranked_games'
    //     }
    // ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create username
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update user route
router.put('/:id', (req, res) => {
  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete route
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;