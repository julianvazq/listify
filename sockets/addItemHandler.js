const { GET_ITEMS, ADD_ITEM } = require('../db/queries/item');

module.exports = (event, socket, io) => {
  socket.on(event, async ({ listId, itemName, user, items }, callback) => {
    await ADD_ITEM(itemName, listId, user.id);

    const updatedItems = await GET_ITEMS(listId);

    /* Get items that are currently being edited */
    const itemsWithEditingState = [];
    items.forEach((item, index) => {
      if (item.editing && item.editing.active) {
        itemsWithEditingState.push({ ...item, index });
      }
    });

    /* Insert items currently being edited into array of new items
       in order to maintain their editing state */
    itemsWithEditingState.forEach((itemBeingEdited) => {
      updatedItems[itemBeingEdited.index] = itemBeingEdited;
    });

    io.in(listId).emit('UPDATE_ITEMS', updatedItems);
  });
};
