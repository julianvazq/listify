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
const editingHandler = require('./sockets/editingHandler');
const deleteItemHandler = require('./sockets/deleteItemHandler');

io.on('connection', (socket) => {
  createListHandler('CREATE_LIST', socket);
  getListHandler('GET_LIST', socket);
  createUserHandler('CREATE_USER', socket);
  editingHandler('EDITING_ITEM', socket);
  updateItemHandler('UPDATE_ITEM', socket);
  deleteItemHandler('DELETE_ITEM', socket);

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
