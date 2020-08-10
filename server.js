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
const addItemHandler = require('./sockets/addItemHandler');
const updateUserNameHandler = require('./sockets/updateUserNameHandler');

io.on('connection', (socket) => {
  createListHandler('CREATE_LIST', socket, io);
  getListHandler('GET_LIST', socket, io);
  createUserHandler('CREATE_USER', socket, io);
  editingHandler('EDITING_ITEM', socket, io);
  updateItemHandler('UPDATE_ITEM', socket, io);
  deleteItemHandler('DELETE_ITEM', socket, io);
  addItemHandler('ADD_ITEM', socket, io);
  updateUserNameHandler('UPDATE_USER_NAME', socket, io);

  socket.on('disconnect', () => {
    console.log(`DISCONNECT: A user just disconnected.`);
  });
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
