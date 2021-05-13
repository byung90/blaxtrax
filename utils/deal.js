const { Hand, Bet, Table, TablePlayer, User } = require('../models');

const newHand = async () => {
  try {
    const handData = await Hand.create({});
    return handData;

  }
  catch (err) {
    return (err);
  }
}

const getAllHandsInTable = async (tableId) => {
  try {

  }
  catch (err) {

  }
}

const getTable = async (id) => {
  try {
    const tableData = await Table.findByPk(id, {
      include: [{ model: TablePlayer, include: [{ model: User, attributes: ['id', 'name', 'balance'] }] }]
    })
    return tableData;
  }
  catch (err) {
    return (err);
  }
}

module.exports = {
  newHand,
  getTable
};