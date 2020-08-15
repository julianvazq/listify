const pool = require('../pool');

/* MEMBERSHIPS acts as a join table betewen LISTS and USERS */

/* @TYPE: EXISTS
   @DESC: Check if membership exists
   @RETURNS: boolean
   @EXAMPLE RESPONSE: true
*/
const CHECK_MEMBERSHIP = async (listId, userId) => {
  try {
    const membership = await pool.query(
      'SELECT EXISTS(SELECT m.user_id FROM memberships m INNER JOIN lists l ON (m.list_id = l.list_id) WHERE (m.list_id = $1) AND (m.user_id = $2))',
      [listId, userId]
    );

    if (!membership.rows[0].exists) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
  }
};

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
    console.log(
      `Successful membership created: listId: ${listId} AND userId: ${userId}`
    );
  } catch (error) {
    console.log(error);
  }
};

/* @TYPE: DELETE 
   @DESC: Delete membership 
   @RETURNS: void
*/
const DELETE_MEMBERSHIP = async (listId, userId) => {
  try {
    const deleteMembership = await pool.query(
      'DELETE FROM memberships WHERE list_id = $1 AND user_id = $2',
      [listId, userId]
    );
    console.log(`Membership deleted: listId: ${listId} AND userId: ${userId}`);
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
    console.log('GET_MEMBERS: ', error);
    return { message: 'There was a problem [MEMEBERS-SELECT].', error: true };
  }
};

module.exports = {
  CHECK_MEMBERSHIP,
  CREATE_MEMBERSHIP,
  DELETE_MEMBERSHIP,
  GET_MEMBERS,
};
