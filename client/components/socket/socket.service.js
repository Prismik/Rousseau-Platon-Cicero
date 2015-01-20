/* global io */
'use strict';

angular.module('rousseauPlatoCiceroApp')
  .factory('socket', function(socketFactory) {

    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io('', {
      // Send auth token on connection, you will need to DI the Auth service above
      // 'query': 'token=' + Auth.getToken()
      path: '/socket.io-client'
    });

    var socket = socketFactory({
      ioSocket: ioSocket
    });

    return {
      io: socket,

      syncPlayers: function(callbacks) {
      	socket.on('action', function (item) {
      		console.log("Action");
          callbacks[0](item);
        });

        socket.on('roomConnect', function (info) {
          callbacks[1](info);
          console.log("Room Connect");
        });

        socket.on('connectExisting', function (info) {
          callbacks[2](info);
          console.log("Connect existing");
        });
      },

      unsyncPlayers : function () {
      	socket.removeAllListeners('action');
      }
    };
  });
