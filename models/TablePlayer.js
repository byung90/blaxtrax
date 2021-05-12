const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class TablePlayer extends Model { }

TablePlayer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    table_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'table',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tablePlayer'
  }
)

module.exports = TablePlayer;