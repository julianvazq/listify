const { GET_ITEMS, ADD_ITEM } = require('../db/queries/item');

module.exports = (event, socket) => {
  socket.on(event, async ({ listId, itemName, user }, callback) => {
    await ADD_ITEM(itemName, listId, user.id);

    const items = await GET_ITEMS(listId);

    socket.to(listId).emit('UPDATE_ITEMS', items);

    callback(items);
  });
};
