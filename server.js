/* Initialize socket.io and express */
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

/* Routes */
const router = require('./routes/router');
app.use(router);

/* Deployment */
const path = require('path');
// app.use(express.static(`${__dirname}/client/build`));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build/index.html'));
// });

/* Socket Event Handlers */
const createListHandler = require('./sockets/createListHandler');
const getListHandler = require('./sockets/getListHandler');
const leaveListHandler = require('./sockets/leaveListHandler');
const createUserHandler = require('./sockets/createUserHandler');
const updateUserNameHandler = require('./sockets/updateUserNameHandler');
const addItemHandler = require('./sockets/addItemHandler');
const deleteItemHandler = require('./sockets/deleteItemHandler');
const updateItemHandler = require('./sockets/updateItemHandler');
const editingHandler = require('./sockets/editingHandler');

/* Listen for socket events */
io.on('connection', (socket) => {
  createListHandler('CREATE_LIST', socket, io);
  getListHandler('GET_LIST', socket, io);
  leaveListHandler('LEAVE_LIST', socket, io);
  createUserHandler('CREATE_USER', socket, io);
  updateUserNameHandler('UPDATE_USER_NAME', socket, io);
  addItemHandler('ADD_ITEM', socket, io);
  deleteItemHandler('DELETE_ITEM', socket, io);
  updateItemHandler('UPDATE_ITEM', socket, io);
  editingHandler('EDITING_ITEM', socket, io);

  socket.on('disconnect', () => {
    console.log(`DISCONNECT: A user just disconnected.`);
  });
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
