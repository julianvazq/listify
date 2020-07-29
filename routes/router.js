const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

router.get('/', (req, res) => {
  res.send(JSON.stringify('Hello there.'));
});

router.get('/list/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  // const newList = await pool.query(
  //   'INSERT INTO public.lists (id) VALUES($1) RETURNING *',
  //   [id]
  // );
  // console.log(newList.rows);
});

// SELECT ALL
router.get('/query', async (req, res) => {
  const list = await pool.query('SELECT * FROM public.lists');
  console.log(list.rows[0]);
});

// GET BY ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const list = await pool.query('SELECT * FROM public.lists WHERE id = $1', [
    id,
  ]);
  console.log(list.rows);
});

// ADD LIST
router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const newList = await pool.query(
    'INSERT INTO public.lists (id) VALUES($1) RETURNING *',
    [id]
  );
  console.log(newList.rows);
});

module.exports = router;
