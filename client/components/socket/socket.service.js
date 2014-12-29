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
          callback[0](item);
        });

        socket.on('roomConnect', function () {
          callback[1]();
        });
      },

      unsyncPlayers : function () {
      	socket.removeAllListeners('action');
      }
    };
  });
