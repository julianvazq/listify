const { Pool } = require('pg');

/* Connect to DB */
const pool = new Pool({
  connectionString: process.env.DB_URI,
});

module.exports = pool;
