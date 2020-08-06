const { GET_ITEMS, ADD_ITEM } = require('../db/queries/item');

module.exports = (event, socket, io) => {
  socket.on(event, async ({ listId, itemName, user }, callback) => {
    await ADD_ITEM(itemName, listId, user.id);

    const items = await GET_ITEMS(listId);

    io.in(listId).emit('UPDATE_ITEMS', items);
  });
};
