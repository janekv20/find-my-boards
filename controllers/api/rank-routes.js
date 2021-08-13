const router = require("express").Router();
const { Rank } = require("../../models");

router.get("/", (req, res) => {
  Rank.findAll({
    attributes: ["id", "user_id", "game_id"],
  })
    .then((dbRankData) => res.json(dbRankData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
    Rank.create({
    user_id: req.body.user_id,
    game_id: req.body.game_id,
  })
    .then((dbRankData) => res.json(dbRankData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
    Rank.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbRankData) => {
      if (!dbRankData) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      res.json(dbRankData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;