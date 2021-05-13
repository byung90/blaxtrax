const { TablePlayer } = require('../models');

const tablePlayerData = [
  {
    table_id: 1,
    user_id: 1,
  },
  {
    table_id: 2,
    user_id: 2,
  },
  {
    table_id: 3,
    user_id: 3,
  },
  {
    table_id: 4,
    user_id: 4,
  },
  {
    table_id: 5,
    user_id: 5,
  },
  {
    table_id: 6,
    user_id: 6,
  },
  {
    table_id: 7,
    user_id: 7,
  },
  {
    table_id: 8,
    user_id: 8,
  }
];

const seedTablePlayers = async () => TablePlayer.bulkCreate(tablePlayerData);

module.exports = seedTablePlayers;
