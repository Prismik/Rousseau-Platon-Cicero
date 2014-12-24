/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Player = require('./player.model');

exports.register = function(socket) {
  Player.schema.post('action', function (doc) {
    onSave(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('action', doc);
}