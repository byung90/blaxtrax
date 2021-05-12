const router = require("express").Router();
const { Table, TablePlayer } = require("../../models");

//Get all tables
router.get('/', async (req, res) => {
  try {
    const tableData = await Table.findAll({
      include: [{ model: TablePlayer }]
    });
    res.status(200).json(tableData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

//Get specific table
router.get('/:id', async (req, res) => {
  try {
    const tableData = await Table.findByPk(req.params.id, {
      include: [{ model: TablePlayer }]
    });
    if (!tableData) {
      res.status(404).json(tableData);
    }
    res.status(200).json(tableData);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

//Update round number
router.put('/:id/updateRoundNumber', async (req, res) => {
  try {
    const originalTableData = await Table.findByPk(req.params.id);
    const updatedTableData = {
      min_bet: originalTableData.get({ plain: true }).min_bet,
      round_number: originalTableData.get({ plain: true }).round_number + 1
    };
    const tableData = await Table.update(updatedTableData, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(tableData);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
