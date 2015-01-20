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
	socket.join('room1');

  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  socket.on('roomConnect', function (name) {
  	io.sockets.in('room1').emit('roomConnect', name);
  });

  socket.on('existingPlayer', function (name){
  	socket.broadcast.to('room1').emit('connectExisting', name);
  });

  socket.on('action', function (item) {
  	io.to('room1').emit('action', item);
  });
}

var con = 8888;

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));
  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address;// !== null ?
            //socket.handshake.address;// + ':' +  con.toString()/*socket.handshake.address.port*/ :
     //       process.env.DOMAIN;
   // con++;
    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket, socketio);
    console.info('[%s] CONNECTED', socket.address);
  });
};