const { Pool } = require('pg');
require('dotenv').config();

/* Connect to DB */
const pool = new Pool({
  connectionString: process.env.DB_URI,
});

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

module.exports = pool;
