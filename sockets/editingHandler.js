const { GET_ITEMS } = require('../db/queries/item');

module.exports = (event, socket) => {
  socket.on(event, async ({ listId, itemId, user, editing }, callback) => {
    const items = await GET_ITEMS(listId);

    const itemsWithEditMode = items.map((item) => {
      if (item.item_id === itemId) {
        return {
          ...item,
          editing: { active: editing, by: user.username },
        };
      }
      return item;
    });

    socket.to(listId).emit('EDITING', itemsWithEditMode);
  });
};
