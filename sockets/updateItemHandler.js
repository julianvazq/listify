const { UPDATE_ITEM, GET_ITEMS } = require('../db/queries/item');

module.exports = (event, socket) => {
  socket.on(event, async ({ listId, itemId, property, value }, callback) => {
    console.log(property, value);

    switch (property) {
      case 'completed':
        await UPDATE_ITEM(property, value, itemId);
      case 'edit_mode':
        await UPDATE_ITEM(property, value, itemId);
      default:
        break;
    }

    const items = await GET_ITEMS(listId);

    socket.to(listId).emit('UPDATE_ITEMS', items);
  });
};
