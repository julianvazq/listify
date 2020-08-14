const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const path = require('path');

/* Endpoint for lists' preview */
router.get('/list/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const newList = await pool.query(
      'SELECT item_name, completed FROM items i INNER JOIN lists l ON (i.list_id = l.list_id) WHERE (l.list_id = $1) ORDER BY i.creation_date ASC',
      [id]
    );
    res.send(newList.rows).status(200);
  } catch (error) {
    console.log('Error fetching preview list', error);
    res.status(404);
  }
});

module.exports = router;
