const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Card extends Model { }

Card.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shape: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['heart', 'club', 'diamond', 'spade']]
      }
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphaNumberic: true,
        isIn: [[2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']]
      }
    },
    table_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'table',
        key: 'id'
      }
    },
    tablePlayer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tablePlayer',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'card'
  }
)

module.exports = Card;