const router = require('express').Router();
const categoriesRoutes = require('./categories-routes.js')
const userRoutes = require('./user-routes.js');
const commentRoutes = require('./comment-routes.js');
const friendRoutes = require('./friend-routes');
const gameRoutes = require('./game-routes');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/friends', friendRoutes);
router.use('/categories', categoriesRoutes);
router.use('/games', gameRoutes);

module.exports = router;