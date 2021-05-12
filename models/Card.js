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
    /*
    array index to identify the card easily
    0-CA
    1-C2
    2-C3
    3-C4
    4-C5
    5-C6
    6-C7
    7-C8
    8-C9
    9-C10
    10-CJ
    11-CQ
    12-CK
    13-DA
    14-D2
    15-D3
    16-D4
    17-D5
    18-D6
    19-D7
    20-D8
    21-D9
    22-D10
    23-DJ
    24-DQ
    25-DK
    26-HA
    27-H2
    28-H3
    29-H4
    30-H5
    31-H6
    32-H7
    33-H8
    34-H9
    35-H10
    36-HJ
    37-HQ
    38-HK
    39-SA
    40-S2
    41-S3
    42-S4
    43-S5
    44-S6
    45-S7
    46-S8
    47-S9
    48-S10
    49-SJ
    50-SQ
    51-SK
    */
    cardArrayIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    isRevealed: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
    hand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hand',
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