'use strict';

angular.module('rousseauPlatoCiceroApp')
  .controller('PlayCtrl', ['$scope', '$http', 'Player', 'socket', function ($scope, $http, Player, socket) {
    $scope.players = [];
    socket.syncPlayers([function(player) {
    	if (player.index == 0) {
	    	$scope.players[0].refresh(player);
	    }
	    else {
	    	$scope.players[1].refresh(player);
	    }
    }, function() {
    	 $scope.players.push(new Player('Player '+ $scope.players.length, $scope.players.length));
    }]);

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
