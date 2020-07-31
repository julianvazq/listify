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

const router = require('./routes/router');
app.use(router);

io.on('connection', (socket) => {
  socket.on('join', ({ listId, listName, username }, callback) => {
    console.log(
      `listID: ${listId}
       listName: ${listName}
       username: ${username}`
    );

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
    FROM lists INNER JOIN users ON (lists.id = users.list_id);
 */
