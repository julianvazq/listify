/* Initialize socket.io */
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

/* CORS */
const cors = require('cors');
app.use(cors());

/* Dotenv */
require('dotenv').config();

/* Db */
const pool = require('./db/pool');

const router = require('./routes/router');
app.use(router);

io.on('connection', (socket) => {
  socket.on('join', async ({ listId, listName, user }, callback) => {
    // console.log(
    //   `listID: ${listId}
    //    listName: ${listName}
    //    username: ${user.username}`
    // );

    try {
      /* Check if list exists */
      const list = await pool.query(
        'SELECT EXISTS(SELECT 1 FROM lists WHERE list_id = $1)',
        [listId]
      );

      console.log(list);

      /* If it exists */
      if (list.rows[0].exists) {
        /* Check if list exists */
        const findUser = await pool.query(
          'SELECT EXISTS(SELECT 1 FROM users WHERE user_id = $1)',
          [user.id]
        );

        if (!findUser.rows[0].exists) {
          const newUser = await pool.query(
            'INSERT INTO users(user_id, name, list_id) VALUES($1, $2, $3) RETURNING *',
            [user.id, user.username, listId]
          );
        }

        /* Find all list members */
        const members = await pool.query(
          'SELECT users.name FROM lists INNER JOIN users USING(list_id) WHERE (list_id = $1)',
          [listId]
        );

        console.log('RETURN FROM EXISTING LIST --- ', listName, members.rows);
        /* If it doesn't exist */
      } else {
        /* Create new list  */
        console.log('CREATING NEW LIST');
        const newList = await pool.query(
          'INSERT INTO lists(list_id, name) VALUES($1, $2) RETURNING *',
          [listId, listName]
        );

        /* Create new user */
        const newUser = await pool.query(
          'INSERT INTO users(user_id, name, list_id) VALUES($1, $2, $3) RETURNING *',
          [user.id, user.username, listId]
        );

        console.log('RETURN FROM NEW LIST --- ', listName, [user]);
      }
    } catch (error) {
      throw error;
    }

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
    console.log('user just disconnected');
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
