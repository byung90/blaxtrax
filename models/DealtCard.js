const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class DealtCard extends Model { }

DealtCard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    card_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'card',
        key: 'id'
      }
    },
    tablePlayer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    modelName: 'dealtCard'
  }
)

module.exports = DealtCard;