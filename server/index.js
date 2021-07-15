const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app)

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection',socket => {
  socket.on('message',({name, message}) => {
    io.emit('message',{name, message})
  })
})

server.listen(4000,() => {
  console.log('listen on port 4000')
})

