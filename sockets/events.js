const { CHECK_USER, CREATE_USER } = require('../db/queries/user');
const { CREATE_LIST } = require('../db/queries/list');
const { GET_ITEMS } = require('../db/queries/item');
const { CREATE_MEMBERSHIP, GET_MEMBERS } = require('../db/queries/membership');
const { io } = require('../server');

/* Socket Event: CREATE_LIST */
const createList = async ({ listId, listName, user }, callback) => {
  console.log('CREATE LIST ACTION');

  const newList = await CREATE_LIST(listId, listName);

  const userExists = await CHECK_USER(user.id);

  const newUser = !userExists && (await CREATE_USER(user));
  !userExists && (await CREATE_MEMBERSHIP(listId, user.id));

  let res = {
    items: [],
    /* newUser.name is UNDEFINED if user already exists */
    members: [{ name: newUser.name }],
    listName: newList.name,
  };

  if (newUser.error || newList.error) {
    res = { error: 'Something went wrong...' };
  }

  callback(res);
};

/* Socket Event: GET_LIST */
const getList = async ({ listId, listName, user }, callback) => {
  console.log('GET LIST ACTION');

  // console.log(socket);

  const items = await GET_ITEMS(listId);

  // if (user.username !== '') {
  //   await CREATE_MEMBERSHIP(listId, user.id);
  // }

  const members = await GET_MEMBERS(listId);

  let res = {
    items,
    members,
    listName,
  };

  if (items.error) {
    res = { error: 'Something went wrong...' };
  }

  callback(res);
};

/* Socket Event: CREATE_USER
   This event is for creating users that were invited to the list
   after the modal promps them for a username */
const createUser = async ({ user, listId }, callback) => {
  console.log('event to create user: ', user.username, user.id);

  await CREATE_USER(user);
  await CREATE_MEMBERSHIP(listId, user.id);

  const members = await GET_MEMBERS(listId);

  io.sockets.emit('NEW_MEMBER', members);
  callback();
};

module.exports = { createList, getList, createUser };
