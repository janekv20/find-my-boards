const router = require('express').Router();

const apiRoutes = require('./api/');

// grabs the home-routes file
const homeRoutes = require('./home-routes.js');

const gameRoutes = require('./game-routes.js');

// grabs the user profile routes file
const profileRoutes = require('./profile-routes');

//sends the user to the homeroutes file when they go to the homepage
router.use('/', homeRoutes);

router.use('/game', gameRoutes);

router.use('/api', apiRoutes);

router.use('/profile', profileRoutes)

module.exports = router;