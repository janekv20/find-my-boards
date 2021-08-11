const router = require('express').Router();
const { User, Rank, Friends} = require('../../models');

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



module.exports = router;