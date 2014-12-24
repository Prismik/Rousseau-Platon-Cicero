'use strict';

angular.module('rousseauPlatoCiceroApp')
  .controller('PlayCtrl', ['$scope', '$http', 'Player', 'socket', function ($scope, $http, Player, socket) {
    $scope.playerOne = new Player('Player 1', 1);
    $scope.playerTwo = new Player('Player 2', 2);
    socket.syncPlayers(function(player) {
    	console.log(player)
    	if (player.index == 1) {
	    	$scope.playerOne.refresh(player);
	    }
	    else {
	    	$scope.playerTwo.refresh(player);
	    }
    });
    $scope.select = function(weapon) {
    	$scope.playerOne.select(weapon);
    	$http.post('/api/players', $scope.playerOne);
    };
    $scope.confirm = function() {
    	$scope.playerOne.confirm(true);
    	$http.post('/api/players', $scope.playerOne);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncPlayers();
    });
  }]);
