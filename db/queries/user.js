const pool = require('../pool');

/* @TYPE: EXISTS
   @DESC: Check if user exists
   @RETURNS: boolean
   @EXAMPLE RESPONSE: true
*/
const CHECK_USER = async (userId) => {
  try {
    const user = await pool.query(
      'SELECT EXISTS(SELECT 1 FROM users WHERE user_id = $1)',
      [userId]
    );

    if (!user.rows[0].exists) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
  }
};

/* @TYPE: INSERT 
   @DESC: Create new user 
   @RETURNS: User object
   @EXAMPLE RESPONSE: {user_id: 'ea45c7a4-bb92-458c-bd7b-a4722c6243a5', name: 'John' }
*/
const CREATE_USER = async (user) => {
  try {
    const newUser = await pool.query(
      'INSERT INTO users(user_id, name) VALUES($1, $2) RETURNING *',
      [user.id, user.username]
    );

    // CREATE NEW MEMBERSHIP TO LIST

    return newUser.rows[0];
  } catch (error) {
    console.log(error);
    return { message: 'There was a problem [USER].', error: true };
  }
};

module.exports = { CHECK_USER, CREATE_USER };
