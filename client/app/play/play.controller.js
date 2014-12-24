'use strict';

angular.module('rousseauPlatoCiceroApp')
  .controller('PlayCtrl', ['$scope', 'Player', 'socket', function ($scope, Player, socket) {
    $scope.playerOne = new Player('Player 1', 1);
    $scope.playerTwo = new Player('Player 2', 2);
    socket.syncPlayers($scope.playerOne, $scope.playerTwo);
    $scope.select = function(weapon) {
    	$scope.playerOne.select(weapon);
    	socket.io.emit('action', $scope.playerOne);
    };
    $scope.confirm = function() {
    	$scope.playerOne.confirm(true);
    	socket.io.emit('action', $scope.playerOne);
    };
    $scope.$on('$destroy', function () {
      socket.unsyncPlayers();
    });
  }]);
