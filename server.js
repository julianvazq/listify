/* Socket Setup */
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('Hello there.');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

const PORT = 4000;
http.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
