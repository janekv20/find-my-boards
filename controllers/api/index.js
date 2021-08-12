const router = require('express').Router();
const categoriesRoutes = require('./categories-routes.js')
const userRoutes = require('./user-routes.js');
const rankRoutes = require('./rank-routes.js');
const commentRoutes = require('./comment-routes.js');
const gameRoutes = require('./game-routes');
const followingRoutes = require('./following-routes');

router.use('/users', userRoutes);
router.use('/rank', rankRoutes);
router.use('/comments', commentRoutes);
router.use('/categories', categoriesRoutes);
router.use('/games', gameRoutes);
router.use('/followings', followingRoutes);

module.exports = router;