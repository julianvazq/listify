const pool = require('../pool');

/* @TYPE: SELECT
   @DESC: Get all items from list
   @RETURNS: Array of items
   @EXAMPLE RESPONSE: [ { item_id: 3, item_name: 'Milk', last_edit: 'Maggie' }, ...]
*/

const GET_ITEMS = async (listId) => {
  try {
    const items = await pool.query(
      'SELECT  i.item_id,i.name as item_name, u.name as last_edit FROM items i INNER JOIN users u ON i.last_user_edit = u.user_id WHERE i.list_id = $1',
      [listId]
    );

    return items.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { GET_ITEMS };
