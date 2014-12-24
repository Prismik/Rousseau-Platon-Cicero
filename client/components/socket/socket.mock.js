'use strict';

angular.module('socketMock', [])
  .factory('socket', function() {
    return {
      io: {
        connect: function() {},
        on: function() {},
        emit: function() {},
        receive: function() {}
      },

      syncPlayers: function() {}
      unsyncPlayers: function() {}
    };
  });