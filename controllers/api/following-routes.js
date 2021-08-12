const router = require('express').Router();
const { User, Rank, Friends, Following, Followship } = require('../../models');

// get followships
router.get('/', (req, res) => {
    // access our user model and run .findAll() method)
    Followship.findAll({})
      .then(dbFollowshipData => res.json(dbFollowshipData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// add a followship relationship
router.post('/', (req, res) => {
    Followship.create({
        follower_id: req.body.follower_id,
        followee_id: req.body.followee_id
    })
        .then(dbFollowshipData => res.json(dbFollowshipData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;