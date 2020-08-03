const pool = require('../pool');

/* MEMBERSHIPS acts as a join table betewen LISTS and USERS */

/* @TYPE: INSERT 
   @DESC: Create new membership 
   @RETURNS: void
*/
const CREATE_MEMBERSHIP = async (listId, userId) => {
  try {
    const newMembership = await pool.query(
      'INSERT INTO memberships(list_id, user_id) VALUES($1, $2) RETURNING *',
      [listId, userId]
    );
    console.log('Successful membership created.');
  } catch (error) {
    console.log(error);
  }
};

const GET_MEMBERS = async (listId) => {
  // SELECT u.name FROM users u INNER JOIN memberships m ON u.user_id = m.user_id INNER JOIN lists l ON l.list_id = m.list_id WHERE l.list_id = 'face5486-cca4-44e3-af46-79bfeaa28ff6'
  try {
    const members = await pool.query(
      'SELECT u.name FROM users u INNER JOIN memberships m ON u.user_id = m.user_id INNER JOIN lists l ON l.list_id = m.list_id WHERE l.list_id = $1',
      [listId]
    );

    return members.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { CREATE_MEMBERSHIP, GET_MEMBERS };
