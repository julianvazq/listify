/* Initialize socket.io */
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
exports.io = io;

/* CORS */
const cors = require('cors');
app.use(cors());

/* Dotenv */
require('dotenv').config();

/* Db */
const pool = require('./db/pool');

const router = require('./routes/router');
app.use(router);

/* Socket Event Handlers */
const getListHandler = require('./sockets/getListHandler');
const createListHandler = require('./sockets/createListHandler');
const createUserHandler = require('./sockets/createUserHandler');
const updateItemHandler = require('./sockets/updateItemHandler');
const editModeHandler = require('./sockets/editModeHandler');

io.on('connection', (socket) => {
  createListHandler('CREATE_LIST', socket);

  getListHandler('GET_LIST', socket);

  createUserHandler('CREATE_USER', socket);

  editModeHandler('EDIT_MODE', socket);

  updateItemHandler('UPDATE_ITEM', socket);

  socket.on('message', () => {
    console.log('message received!');
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
