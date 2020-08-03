const e = require('express');
const { CHECK_USER, CREATE_USER } = require('../db/queries/user');
const { CREATE_LIST } = require('../db/queries/list');

/* CREATE-LIST */
const createList = async ({ listId, listName, user }, callback) => {
  console.log('CREATE LIST ACTION');

  const newList = await CREATE_LIST(listId, listName);

  const userExists = await CHECK_USER(user.id);

  const newUser = !userExists && (await CREATE_USER(user));

  let res = {
    items: [],
    /* newUser.name is UNDEFINED if user already exists */
    members: [newUser.name],
    listName: newList.name,
  };

  if (newUser.error || newList.error) {
    res = { error: 'Something went wrong...' };
  }

  callback(res);
};

/* GET-LIST */
const getList = ({ listId }, callback) => {
  console.log('GET LIST ACTION');

  // calback();
};

module.exports = { createList, getList };
