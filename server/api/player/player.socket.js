/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Player = require('./player.model');

exports.register = function(socket) {
  Player.schema.post('action', function (doc) {
    socket.emit('action', doc);
  });
}