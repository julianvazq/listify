const { CREATE_USER } = require('../db/queries/user');
const { CREATE_MEMBERSHIP, GET_MEMBERS } = require('../db/queries/membership');

module.exports = (event, socket) => {
  socket.on(event, async ({ user, listId }, callback) => {
    console.log('CREATE_USER HANDLER: ', user.username, user.id);

    await CREATE_USER(user);
    // await CREATE_MEMBERSHIP(listId, user.id);

    const members = await GET_MEMBERS(listId);

    socket.to(listId).emit('NEW_MEMBER', [...members, { name: user.username }]);
    // callback();
  });
};
