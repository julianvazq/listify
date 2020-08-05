const { GET_ITEMS } = require('../db/queries/item');

module.exports = (event, socket) => {
  socket.on(event, async ({ listId, itemId, user, editMode }, callback) => {
    const items = await GET_ITEMS(listId);

    const itemsWithEditMode = items.map((item) => {
      if (item.item_id === itemId) {
        return {
          ...item,
          edit_mode: { editting: editMode, by: user.username },
        };
      }
      return item;
    });

    socket.to(listId).emit('EDIT_MODE', itemsWithEditMode);
  });
};
