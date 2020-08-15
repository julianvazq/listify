const { DELETE_MEMBERSHIP } = require('../db/queries/membership');

module.exports = (event, socket) => {
  socket.on(event, async ({ listId, user }, callback) => {
    await DELETE_MEMBERSHIP(listId, user.id);

    socket.leave(listId);

    callback();
  });
};
