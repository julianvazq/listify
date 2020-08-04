const { CHECK_USER, CREATE_USER } = require('../db/queries/user');
const { CREATE_LIST } = require('../db/queries/list');
const { CREATE_MEMBERSHIP } = require('../db/queries/membership');

module.exports = (event, socket) => {
  socket.on(event, async ({ listId, listName, user }, callback) => {
    console.log('CREATE_LIST HANDLER');

    socket.join(listId);

    const newList = await CREATE_LIST(listId, listName);

    const userExists = await CHECK_USER(user.id);

    const newUser = !userExists && (await CREATE_USER(user));

    await CREATE_MEMBERSHIP(listId, user.id);

    let res = {
      items: [],
      members: [{ name: user.username }],
      listName: newList.name,
    };

    if (newUser.error || newList.error) {
      res = { error: 'Something went wrong...' };
    }

    callback(res);
  });
};
