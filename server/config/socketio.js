/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
	
}

// When the user connects.. perform this
function onConnect(socket, io) {

  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  socket.on('roomConnect', function (info) {
		socket.join(info.lobby);
  	io.sockets.in(info.lobby).emit('roomConnect', info);
  });

  socket.on('existingPlayer', function (info){
  	socket.broadcast.to(info.lobby).emit('connectExisting', info);
  });

  socket.on('action', function (item) {
  	io.sockets.in(item.lobby).emit('action', item);
  });

  socket.on('msg', function (item) {
  	io.sockets.in(item.lobby).emit('receiveMessage', item);
  })
}

module.exports = function (socketio) {
  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address;
    socket.connectedAt = new Date();

    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    onConnect(socket, socketio);
    console.info('[%s] CONNECTED', socket.address);
  });
};