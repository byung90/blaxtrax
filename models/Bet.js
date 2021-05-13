const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Bet extends Model { }

Bet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    tablePlayer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tablePlayer',
        key: 'id'
      }
    },
    result: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['win', 'draw', 'lose', 'dealer', 'inPlay']]
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'bet'
  }
)

module.exports = Bet;