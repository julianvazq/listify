/* Initialize socket.io */
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
exports.io = io;

/* Socket Actions */
const { createList, getList, createUser } = require('./sockets/events');

/* CORS */
const cors = require('cors');
app.use(cors());

/* Dotenv */
require('dotenv').config();

/* Db */
const pool = require('./db/pool');

const router = require('./routes/router');
app.use(router);

const getListHandler = require('./sockets/getListHandler');
const createListHandler = require('./sockets/createListHandler');
const createUserHandler = require('./sockets/createUserHandler');

io.on('connection', (socket) => {
  // socket.on('CREATE_LIST', createList);
  createListHandler('CREATE_LIST', socket);

  // socket.on('GET_LIST', getList);
  getListHandler('GET_LIST', socket);

  // socket.on('CREATE_USER', createUser);
  createUserHandler('CREATE_USER', socket);

  socket.on('join', async ({ isNewList, listId, listName, user }, callback) => {
    console.log(
      `isNewList: ${isNewList}
      listID: ${listId}
       listName: ${listName}
       username: ${user.username}`
    );

    /* Final values will be set along the way based on query results */
    const res = {
      items: [],
      members: [{ name: user.username }],
      listName,
    };

    try {
      /* 1. If list exists */
      if (!isNewList) {
        /* 1.a. Check if user exists */
        const findUser = await pool.query(
          'SELECT EXISTS(SELECT 1 FROM users WHERE user_id = $1)',
          [user.id]
        );
        if (!findUser.rows[0].exists) {
          const newUser = await pool.query(
            'INSERT INTO users(user_id, name) VALUES($1, $2, $3) RETURNING *',
            [user.id, user.username]
          );
        }
        /* 1.b. Find all list members */
        const members = await pool.query(
          'SELECT users.name FROM lists INNER JOIN users USING(list_id) WHERE (list_id = $1)',
          [listId]
        );
        res.members = members.rows;

        const items = await pool.query(
          'SELECT  i.item_id,i.name as item_name, u.name as created_by FROM items i INNER JOIN users u ON i.user_id = u.user_id WHERE i.list_id = $1',
          [listId]
        );
        res.items = items.rows;

        /* 2. If list doesn't exist */
      } else {
        /* 2.a. Create new list  */
        const newList = await pool.query(
          'INSERT INTO lists(list_id, name) VALUES($1, $2) RETURNING *',
          [listId, listName]
        );
        res.items = [];

        /* 2.b. Check if user exists */
        const findUser = await pool.query(
          'SELECT EXISTS(SELECT 1 FROM users WHERE user_id = $1)',
          [user.id]
        );

        if (!findUser.rows[0].exists) {
          const newUser = await pool.query(
            'INSERT INTO users(user_id, name) VALUES($1, $2, $3) RETURNING *',
            [user.id, user.username]
          );
          res.members = [{ name: newUser.rows[0].name }];
        }
      }
    } catch (error) {
      let errorMessage = 'Something went wrong...';

      if (error.routine === 'string_to_uuid') {
        errorMessage = "List doesn't exist.";
      }
      callback({ error: errorMessage });
    }

    callback(res);

    // SELECT  i.item_id,i.name as item_name, u.name as created_by FROM items i INNER JOIN users u ON i.user_id = u.user_id WHERE i.list_id = '2ab7da0f-d9a4-409c-bc36-e14aa90a4ab8'

    // -------------------------------------------------- OLD CODE BELOW
    //   ,
    //   (err, res) => {
    //     if (err) {
    //       throw err;
    //     }
    //     if (res.rows !== []) {
    //       console.log('it exists');
    //       exists = true;
    //     }
    //   }
    // );
    // if (exists) {
    //   await pool.query(
    //     {
    //       text:
    //         'SELECT * FROM lists INNER JOIN users ON (lists.list_id = users.list_id);',
    //       values: [listId],
    //     },
    //     (err, res) => {
    //       if (err) {
    //         throw err;
    //       }
    //       if (res.rows) {
    //         listMembers = res.rows;
    //       }
    //     }
    //   );
    // } else {
    //   await pool.query(
    //     {
    //       text:
    //         'INSERT INTO public.lists(list_id, name) VALUES($1, $2) RETURNING *',
    //       values: [listId, listName],
    //     },
    //     (err, res) => {
    //       if (err) {
    //         throw err;
    //       }
    //       console.log('return creating: ', res.rows);
    //     }
    //   );
    // }
    /* Look if room exists */
    /*  If not found
        CREATE room
        CREATE user
        RETURN empty array 
    */
    /* If found
       CREATE user
       SELECT items
       SELECT users in room excluding self
       RETURN items and users
     */
    // callback('response to client');
  });

  socket.on('input-item', ({ listId, username, itemName }) => {
    // Works for both editting and adding items
    /* Look if item exists */
    /* If not found
       CREATE item
       SELECT items
       RETURN items (all, to update clients)
    */
    /* If found
       UPDATE item
       RETURN items (all, to update clients)   
    */
    //  WHAT TO RETURN: items ids (postgresIDs), items names,  (usernames?)
  });

  socket.on('delete-item', ({ listId, itemName }) => {
    /* 
       DELETE item
       SELECT items
       RETURN items (all, to update clients)
    */
  });

  socket.on('disconnect', () => {
    console.log(`DISCONNECT: A user just disconnected.`);
  });
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

/* Queries */

/* --- Select all USERS in LIST --- */
/* 
    SELECT *
    FROM lists INNER JOIN users ON (lists.list_id = users.list_id);
 */
