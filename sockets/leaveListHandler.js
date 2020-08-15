const { DELETE_MEMBERSHIP, GET_MEMBERS } = require('../db/queries/membership');
const { DELETE_LIST } = require('../db/queries/list');

module.exports = (event, socket) => {
  socket.on(event, async ({ listId, user }, callback) => {
    await DELETE_MEMBERSHIP(listId, user.id);

    socket.leave(listId);

    const members = await GET_MEMBERS(listId);

    if (members.length === 0) {
      await DELETE_LIST(listId);
    }

    callback();
  });
};
