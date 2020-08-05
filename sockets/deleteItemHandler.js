const { GET_ITEMS, DELETE_ITEM } = require('../db/queries/item');

module.exports = (event, socket) => {
  socket.on(event, async ({ listId, itemId }, callback) => {
    await DELETE_ITEM(itemId);

    const items = await GET_ITEMS(listId);

    socket.to(listId).emit('UPDATE_ITEMS', items);
  });
};
