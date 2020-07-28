const express = require('express');
const { SELECT_ALL } = require('../db/queries');
const router = express.Router();
const pool = require('../db/pool');

router.get('/', (req, res) => {
  res.send(JSON.stringify('Hello there.'));
});

// SELECT ALL
router.get('/query', async (req, res) => {
  const list = await pool.query(SELECT_ALL);
  console.log(list.rows[0]);
});

module.exports = router;
