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
  socket.on('join', ({ id, name }) => {
    console.log(id, name);
  });

  socket.on('disconnect', () => {
    console.log('user just disconnected');
  });
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
