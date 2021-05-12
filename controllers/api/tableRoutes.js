const router = require("express").Router();
const { Table, TablePlayer, Card } = require("../../models");

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
    // Unlock/shuffle cards 

    const tableData = await Table.findByPk(req.params.id, {
      include: [{ model: TablePlayer }, { model: Card }]
    });
  }
  catch (err) { }
})

module.exports = router;
