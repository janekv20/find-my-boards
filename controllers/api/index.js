const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const rankRoutes = require('./rank-routes.js');
const friendRoutes = require('./friend-routes');

router.use('/users', userRoutes);
router.use('/rank', rankRoutes);
router.use('/friends', friendRoutes);

module.exports = router;