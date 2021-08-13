const sequelize = require("../../config/connection");
const router = require("express").Router();
const { Categories, User, Game, Rank, Comment } = require("../../models");

//get games
router.get("/", (req, res) => {
  Game.findAll({
    attributes: [
      "id",
      "game_name",
      "min_number_of_players",
      "min_number_of_players",
      "max_number_of_players",
      "avg_min_game_time",
      "avg_max_game_time",
      "game_description",
    ],
    include: [
      {
        model: Categories,
        attributes: ["id", "category_name"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "game_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: Rank,
        attributes: ["id", "game_id", "user_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbGameData) => res.json(dbGameData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET /api/games/1
router.get("/:id", (req, res) => {
  Game.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "game_name",
      "min_number_of_players",
      "min_number_of_players",
      "max_number_of_players",
      "avg_min_game_time",
      "avg_max_game_time",
      "game_description",
    ],
    include: [
      {
        model: Categories,
        attribtures: ["id", "category_name"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "game_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: Rank,
        attributes: ["id", "game_id", "user_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbGameData) => res.json(dbGameData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create game
router.post("/", (req, res) => {
  Game.create({
    game_name: req.body.game_name,
    category_id: req.body.category_id,
    min_number_of_players: req.body.min_number_of_players,
    max_number_of_players: req.body.max_number_of_players,
    avg_min_game_time: req.body.avg_min_game_time,
    avg_max_game_time: req.body.avg_max_game_time,
    game_description: req.body.game_description,
  })
    .then((dbGameData) => res.json(dbGameData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update game
router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Game.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbGameData) => res.json(dbGameData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete game
router.delete("/:id", (req, res) => {
  Game.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbGameData) => res.json(dbGameData))
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
