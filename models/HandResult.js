const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class HandResult extends Model { }

HandResult.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['win', 'draw', 'loss']]
      }
    },
    bet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bet',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'handResult'
  }
)

module.exports = HandResult;