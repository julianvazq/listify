const pool = require('../pool');

/* @TYPE: INSERT
   @DESC: Create new list 
   @RETURNS: List metadata object
   @EXAMPLE RESPONSE: {
                        list_id: '40466407-4e26-4286-b51c-d57316fbc9c8',
                        name: 'Untitled',
                        creation_date: 2020-08-03T04:00:00.000Z
                      }
*/
const CREATE_LIST = async (listId, listName) => {
  try {
    const newList = await pool.query(
      'INSERT INTO lists(list_id, name) VALUES($1, $2) RETURNING *',
      [listId, listName]
    );

    // CREATE NEW MEMBERSHIP TO LIST

    return newList.rows[0];
  } catch (error) {
    console.log(error);
    return { message: 'There was a problem [LIST].', error: true };
  }
};

module.exports = { CREATE_LIST };
