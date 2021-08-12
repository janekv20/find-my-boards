const router = require('express').Router();
const categoriesRoutes = require('./categories-routes.js')
const userRoutes = require('./user-routes.js');
const rankRoutes = require('./rank-routes.js');
const friendRoutes = require('./friend-routes');
const gameRoutes = require('./game-routes');

router.use('/users', userRoutes);
router.use('/rank', rankRoutes);
router.use('/friends', friendRoutes);
router.use('/categories', categoriesRoutes);
router.use('/games', gameRoutes);

module.exports = router;