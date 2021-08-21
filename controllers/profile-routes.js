const router = require('express').Router();
const { User, Comment, Rank, Game, Following } = require('../models');

router.get('/profile', (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.session.user_id
    },
    include: [
      // comments and all their attributes and include game names they commented on
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Game,
          attributes: ["game_name"],
        },
      },
      // games attribute name through rank as ranked games
      {
        model: Rank,
        attributes: ["id", "user_id", "game_id"],
        include: {
          model: Game,
          attributes: ["game_name"],
        },
      },
      {
        model: Following,
        attributes: ['id', 'following_username'],
      },
    ]
  })

    .then((dbUserData) => {

      const user = dbUserData.get({ plain: true });

      res.render('profile', {
        title: 'Profile',
        user,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
})


router.get('/profile/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id
    },
    include: [
      // comments and all their attributes and include game names they commented on
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Game,
          attributes: ["game_name"],
        },
      },
      // games attribute name through rank as ranked games
      {
        model: Rank,
        attributes: ["id", "user_id", "game_id"],
        include: {
          model: Game,
          attributes: ["game_name"],
        },
      },
      {
        model: Following,
        attributes: ['id', 'following_username'],
      },
    ]
  })

    .then((dbUserData) => {

      const user = dbUserData.get({ plain: true });

      res.render('profile', {
        title: 'Profile',
        user,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
})

// create a route to download a photo to the upload folder
router.post('/profile', (req, res) => {

  // we will call a variable with the same name of the input field on the form in profile handlebars file
  let profilePic;
  let uploadPath;

  // If no files were uploaded send message to user saying so						
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }

  // if user uploads a file						
  // get file object and get move function from object						
  profilePic = req.files.profilePic;

  // create an upload path that we will pass into the move funciton or mv()	
  uploadPath = __dirname + '/profile-pic/' + profilePic.name;
  
  // use mv() to place file on the server. Will move it to the directory we created on line 39 of this doc which moves it to the upload folder						
  profilePic.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    //updates the user's image key to the value of the name of the file
    User.update(
      { image: profilePic.name },
      {
        where: {
          id: req.session.user_id
        }
      }
    )
    setTimeout(function() {
      res.redirect('back')}, 500);
  });
});

module.exports = router;