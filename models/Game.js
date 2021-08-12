const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Game extends Model {
  static rankup(body, models) {
    return models.Rank.create({
      user_id: body.user_id,
      game_id: body.game_id,
    }).then(() => {
      return Game.findOne({
        where: {
          id: body.game_id,
        },
        attributes: [
          "id",
          "game_name",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM rank WHERE game.id = rank.game_id)"
            ),
            "rank_count",
          ],
        ],
      });
    });
  }
}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    game_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
    },
    min_number_of_players: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max_number_of_players: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    avg_min_game_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    avg_max_game_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    game_description: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    }
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "game",
  }
);

module.exports = Game;
