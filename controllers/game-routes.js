const router = require("express").Router();
const { Game, User, Rank, Comment, Categories } = require("../models");


// router.get("/", (req, res) => {
  
//   Comment.findAll({
//     attributes: ["id", "comment_text",],
//   })
//     .then((dbCommentData) => {
//       const comments = dbCommentData.map((comment) =>
//         comment.get({ plain: true })
//       );
//       res.render("game", { comments });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

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
    //   [
    //     sequelize.literal(
    //       "(SELECT COUNT(*) FROM rank WHERE game.id = rank.game_id)"
    //     ),
    //     "rank_count",
    //   ],
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
        model: User,
        attributes: ["username"],
      },
    ],
  })
  .then((dbGameData) => {
    const games = dbGameData.map((game) =>
      game.get({ plain: true })
    );
    console.log(games)
    res.render("game", { games });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
