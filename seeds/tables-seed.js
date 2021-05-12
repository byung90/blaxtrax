const { Table } = require('../models');

const tableData = [
  {
    min_bet: 10.0,
    round_number: 1,
  },
  {
    min_bet: 10.0,
    round_number: 1,
  },
  {
    min_bet: 10.0,
    round_number: 1,
  },
  {
    min_bet: 10.0,
    round_number: 1,
  },
  {
    min_bet: 20.0,
    round_number: 1,
  },
  {
    min_bet: 20.0,
    round_number: 1,
  },
  {
    min_bet: 50.0,
    round_number: 1,
  },
  {
    min_bet: 100.0,
    round_number: 1,
  },
];

const seedTables = () => Table.bulkCreate(tableData);

module.exports = seedTables;
