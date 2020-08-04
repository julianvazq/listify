const { GET_ITEMS } = require('../db/queries/item');
const {
  CHECK_MEMBERSHIP,
  GET_MEMBERS,
  CREATE_MEMBERSHIP,
} = require('../db/queries/membership');

module.exports = (event, socket) => {
  socket.on(event, async ({ listId, listName, user }, callback) => {
    console.log('GET_LIST HANDLER');

    socket.join(listId);

    const items = await GET_ITEMS(listId);

    const membershipExists = await CHECK_MEMBERSHIP(listId, user.id);

    let members = await GET_MEMBERS(listId);

    if (!membershipExists && user.username !== '') {
      await CREATE_MEMBERSHIP(listId, user.id);
      socket
        .to(listId)
        .emit('NEW_MEMBER', [...members, { name: user.username }]);
      members = [...members, { name: user.username }];
    }

    let res = {
      items,
      members,
      listName,
    };

    if (items.error) {
      res = { error: 'Something went wrong...' };
    }

    callback(res);
  });
};
