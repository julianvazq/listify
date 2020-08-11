const { GET_ITEMS } = require('../db/queries/item');
const { io } = require('../server');
const { UPDATE_USER_NAME } = require('../db/queries/user');

module.exports = (event, socket) => {
  socket.on(event, async ({ listId, user }, callback) => {
    const updatedUser = await UPDATE_USER_NAME(user);

    console.log(updatedUser);

    const items = await GET_ITEMS(listId);

    io.in(listId).emit('UPDATE_ITEMS', items);

    callback(updatedUser.name);
  });
};