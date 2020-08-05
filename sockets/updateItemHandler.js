const {
  UPDATE_ITEM_GENERIC,
  UPDATE_ITEM_NAME,
  GET_ITEMS,
} = require('../db/queries/item');

module.exports = (event, socket) => {
  socket.on(
    event,
    async ({ listId, itemId, property, value, user }, callback) => {
      console.log(property, value);

      switch (property) {
        case 'completed':
          await UPDATE_ITEM_GENERIC(property, value, itemId);
        case 'item_name':
          await UPDATE_ITEM_NAME(property, value, itemId, user.id);
        default:
          break;
      }

      const items = await GET_ITEMS(listId);

      socket.to(listId).emit('UPDATE_ITEMS', items);

      callback();
    }
  );
};
