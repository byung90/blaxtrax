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

const getTable = async (id) => {
  try {
    const tableData = await Table.findByPk(id, {
      include: [{ model: TablePlayer }]
    })
    return tableData;
  }
  catch (err) {
    return (err);
  }
}

module.exports = {
  newHand
};