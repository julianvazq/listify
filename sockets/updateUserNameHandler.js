const { GET_ITEMS } = require('../db/queries/item');
const {
  UPDATE_USER_NAME,
  CHECK_USER,
  CREATE_USER,
} = require('../db/queries/user');

module.exports = (event, socket, io) => {
  socket.on(event, async ({ listId, user, fromHome }, callback) => {
    const userExists = await CHECK_USER(user.id);

    let updatedUser;

    if (userExists) {
      updatedUser = await UPDATE_USER_NAME(user);
    } else {
      updatedUser = await CREATE_USER(user);
    }

    if (!fromHome) {
      const items = await GET_ITEMS(listId);

      io.in(listId).emit('UPDATE_ITEMS', items);
    }

    callback(updatedUser.name);
  });
};
