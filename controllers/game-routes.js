const router = require("express").Router();
const { Comment } = require("../models");


router.get("/", (req, res) => {
  
  Comment.findAll({
    attributes: ["id", "comment_text",],
  })
    .then((dbCommentData) => {
      const comments = dbCommentData.map((comment) =>
        comment.get({ plain: true })
      );
      res.render("game", { comments });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
