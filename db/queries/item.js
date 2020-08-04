const pool = require('../pool');

/* @TYPE: SELECT
   @DESC: Get all items from list
   @RETURNS: Array of items
   @EXAMPLE RESPONSE: [ { item_id: 3, item_name: 'Milk', last_edit: 'Maggie', completed: false,
                          list_id: '97205509-b1e5-4f6d-8522-554fbd856167' }, ... ]
*/
const GET_ITEMS = async (listId) => {
  try {
    const items = await pool.query(
      'SELECT  i.item_id,i.name as item_name, u.name as last_edit, i.completed, i.list_id FROM items i INNER JOIN users u ON i.last_user_edit = u.user_id WHERE i.list_id = $1',
      [listId]
    );

    return items.rows;
  } catch (error) {
    console.log(error);
    return { message: 'There was a problem [ITEM-SELECT].', error: true };
  }
};

/* @TYPE: UPDATE
   @DESC: Update 'completed' column
   @RETURNS: Updated item
   @EXAMPLE RESPONSE: { item_id: 5, item_name: 'Cheese', last_edit: 'Aang' }
*/
const UPDATE_ITEM_COMPLETED = async (value, itemId) => {
  try {
    const updatedItem = await pool.query(
      'UPDATE items SET completed = $1 WHERE item_id = $2 RETURNING *',
      [value, itemId]
    );

    return updatedItem.rows[0];
  } catch (error) {
    console.log(error);
    return { message: 'There was a problem [ITEM-UPDATE].', error: true };
  }
};

module.exports = { GET_ITEMS, UPDATE_ITEM_COMPLETED };
