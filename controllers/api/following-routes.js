const router = require('express').Router();
const { Following } = require('../../models');

// add a followship relationship
router.post('/', (req, res) => {
  //check the session
    Following.create({
        following_username: req.body.follower_id,
        user_id: req.session.user_id
    })
        .then(dbFollowingData => res.json(dbFollowingData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// remove following
router.delete('/:id', withAuth, (req, res) => {
  Following.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'You do not follow this user!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;