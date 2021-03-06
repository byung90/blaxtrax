const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Table extends Model { }

Table.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    min_bet: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    round_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_in_round: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    is_dealer_card_revealed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'table'
  }
)

module.exports = Table;