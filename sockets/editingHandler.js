const { GET_ITEMS } = require('../db/queries/item');

module.exports = (event, socket) => {
  socket.on(event, async ({ listId, item, editing }, callback) => {
    const items = await GET_ITEMS(listId);

    const itemsWithEditMode = items.map((dbItem) => {
      if (dbItem.item_id === item.id) {
        return {
          ...item,
          item_name: item.name,
          editing,
        };
      }
      return dbItem;
    });

    socket.to(listId).emit('EDITING', itemsWithEditMode);
  });
};
