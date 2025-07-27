const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const users = {}; // { socket.id: username }

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('set_username', (username) => {
    users[socket.id] = username;

    // Send updated user list to all clients
    io.emit('user_list', Object.entries(users).map(([id, name]) => ({
      id,
      username: name,
    })));
  });

  socket.on('send_message', (data) => {
    if (data.type === 'private' && data.to) {
      // send only to the recipient and back to sender
      io.to(data.to).emit('receive_message', data);
      io.to(socket.id).emit('receive_message', data);
    } else {
      io.emit('receive_message', data); // public
    }
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('user_list', Object.entries(users).map(([id, name]) => ({
      id,
      username: name,
    })));
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log('Server running on port 3001');
});


