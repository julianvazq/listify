const pool = require('../pool');

/* @TYPE: SELECT
   @DESC: Get all items from list
   @RETURNS: Array of items sorted by creation date/time
   @EXAMPLE RESPONSE: [ { item_id: 3, item_name: 'Milk', last_edit: 'Maggie', completed: false,
                          list_id: '97205509-b1e5-4f6d-8522-554fbd856167' }, ... ]
*/
const GET_ITEMS = async (listId) => {
  try {
    const items = await pool.query(
      'SELECT  i.item_id, i.item_name, u.name as last_edit_name, u.user_id as last_edit_id, i.completed, i.list_id FROM items i INNER JOIN users u ON i.last_user_edit = u.user_id WHERE i.list_id = $1 ORDER BY i.creation_date ASC',
      [listId]
    );

    return items.rows;
  } catch (error) {
    console.log('GET_ITEMS: ', error);
    return {
      message: 'There was a problem [ITEM-SELECT].',
      error: true,
      type: error.routine,
    };
  }
};

/* @TYPE: UPDATE
   @DESC: Update 'completed' column
   @RETURNS: Updated item
   @EXAMPLE RESPONSE: { item_id: 5, item_name: 'Cheese', last_edit: 'Aang' }
*/
const UPDATE_ITEM_GENERIC = async (property, value, itemId) => {
  try {
    const updatedItem = await pool.query(
      `UPDATE items SET ${property} = $1 WHERE item_id = $2 RETURNING *`,
      [value, itemId]
    );

    return updatedItem.rows[0];
  } catch (error) {
    console.log(error);
    return { message: 'There was a problem [ITEM-UPDATE].', error: true };
  }
};

/* @TYPE: UPDATE
   @DESC: Update 'last_edit' column
   @RETURNS: Updated item
   @EXAMPLE RESPONSE: { item_id: 5, item_name: 'Cheese', last_edit: 'Aang' }
*/
const UPDATE_ITEM_NAME = async (property, value, itemId, userId) => {
  try {
    const updatedItem = await pool.query(
      `UPDATE items SET ${property} = $1, last_user_edit = $2 WHERE item_id = $3 RETURNING *`,
      [value, userId, itemId]
    );

    return updatedItem.rows[0];
  } catch (error) {
    console.log(error);
    return { message: 'There was a problem [ITEM-UPDATE].', error: true };
  }
};

/* @TYPE: DELETE
   @DESC: Delete item
   @RETURNS: void
*/
const DELETE_ITEM = async (itemId) => {
  try {
    const deleteItem = await pool.query(
      `DELETE FROM items WHERE item_id = $1`,
      [itemId]
    );
  } catch (error) {
    console.log(error);
    return { message: 'There was a problem [ITEM-UPDATE].', error: true };
  }
};

/* @TYPE: ADD
   @DESC: Add item
   @RETURNS: New item
   @EXAMPLE RESPONSE: { item_id: 5, item_name: 'Cheese', last_edit: 'Aang' }
*/
const ADD_ITEM = async (itemName, listId, userId) => {
  try {
    const newItem = await pool.query(
      'INSERT INTO items(item_name, list_id, last_user_edit) VALUES($1, $2, $3) RETURNING *',
      [itemName, listId, userId]
    );

    return newItem.rows[0];
  } catch (error) {
    console.log(error);
    return { message: 'There was a problem [ITEM-UPDATE].', error: true };
  }
};

module.exports = {
  GET_ITEMS,
  UPDATE_ITEM_GENERIC,
  UPDATE_ITEM_NAME,
  DELETE_ITEM,
  ADD_ITEM,
};
