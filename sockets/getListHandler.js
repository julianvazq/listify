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

    if (items.error) {
      if (items.type === 'string_to_uuid') {
        callback({ error: 'This list does not exist.' });
      } else {
        callback({ error: 'Something went wrong...' });
      }
      return;
    }

    const membershipExists = await CHECK_MEMBERSHIP(listId, user.id);

    let members = await GET_MEMBERS(listId);

    if (members.error) {
      callback({ error: 'Something went wrong...' });
      return;
    }

    if (!membershipExists && user.username !== '') {
      await CREATE_MEMBERSHIP(listId, user.id);
      socket
        .to(listId)
        .emit('NEW_MEMBER', [...members, { name: user.username }]);
      members = [...members, { name: user.username }];
    }

    const res = {
      items,
      members,
      listName,
    };

    callback(res);
  });
};
