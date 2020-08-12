const {
  UPDATE_ITEM_GENERIC,
  UPDATE_ITEM_NAME,
  GET_ITEMS,
} = require('../db/queries/item');

module.exports = (event, socket, io) => {
  socket.on(
    event,
    async ({ listId, itemId, property, value, user }, callback) => {
      switch (property) {
        case 'completed':
          await UPDATE_ITEM_GENERIC(property, value, itemId);
          break;
        case 'item_name':
          await UPDATE_ITEM_NAME(property, value.trim(), itemId, user.id);
          break;
        default:
          break;
      }

      const items = await GET_ITEMS(listId);

      io.in(listId).emit('UPDATE_ITEMS', items);
    }
  );
};
