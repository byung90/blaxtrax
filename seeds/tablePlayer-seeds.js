const { TablePlayer } = require('../models');

const tablePlayerData = [
  {
    table_id: 1,
    user_id: 1,
  }
];

const seedTablePlayers = () => TablePlayer.bulkCreate(tablePlayerData);

module.exports = seedTablePlayers;
