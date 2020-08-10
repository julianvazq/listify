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

    return newUser.rows[0];
  } catch (error) {
    console.log(error);
    return { message: 'There was a problem [USER-CREATE].', error: true };
  }
};

/* @TYPE: UPDATE 
   @DESC: Update user name 
   @RETURNS: Updated user
   @EXAMPLE RESPONSE: {user_id: 'ea45c7a4-bb92-458c-bd7b-a4722c6243a5', name: 'John' }
*/
const UPDATE_USER_NAME = async (user) => {
  try {
    const updatedUser = await pool.query(
      'UPDATE users SET name = $1 WHERE user_id = $2 RETURNING *',
      [user.username, user.id]
    );

    return updatedUser.rows[0];
  } catch (error) {
    console.log(error);
    return { message: 'There was a problem [USER-UPDATE].', error: true };
  }
};

module.exports = { CHECK_USER, CREATE_USER, UPDATE_USER_NAME };
