const { UPDATE_ITEM_COMPLETED, GET_ITEMS } = require('../db/queries/item');

module.exports = (event, socket) => {
  socket.on(event, async ({ listId, itemId, property, value }, callback) => {
    console.log(property, value);

    let updatedItem;

    switch (property) {
      case 'completed':
        updatedItem = await UPDATE_ITEM_COMPLETED(value, itemId);
      default:
        break;
    }

    const items = await GET_ITEMS(listId);
    console.log(updatedItem);

    // const updatedItems = items.map((item) => {
    //     if (item.item_id === updatedItem.item_id) {
    //       return updatedItem;
    //     }
    //     return item;
    //   });

    socket.to(listId).emit('UPDATE_ITEMS', items);
  });
};
