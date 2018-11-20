const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(express.static('public'));

app.get('/', (req, res)=>{
  res.sendFile('index.html')
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log(`Message: ${msg}\nFrom: ${socket.id}`);
    io.emit('chat message', msg)
    })
})

server.listen(5000, () => {
  console.log('listening on port 5000');
});
