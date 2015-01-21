'use strict';

angular.module('rousseauPlatoCiceroApp')
	.controller('PlayCtrl', ['$scope', '$http', 'Player', 'socket', function ($scope, $http, Player, socket) {
		$scope.players = [];
		$scope.inLobby = false;
		$scope.con = {};
		$scope.selfIndex = 0;
		$scope.otherIndex = 0;
		var winnerIndex = function() {
			var p1 = $scope.players[0];
			var p2 = $scope.players[1];
			if (p1.weapon % 3 + 1 == p2.weapon)
				return 1;
			else if (p2.weapon % 3 + 1 == p1.weapon)
				return 0;
			else 
				return -1;
		};

		var reset = function() {
			$scope.players[0].reset();
			$scope.players[1].reset();
		};
		var refresh = function(player) {
			console.log($scope.players);
			$scope.players[player.index].refresh(player)
			console.log($scope.players);
			if ($scope.players[0].weapon != 0 && $scope.players[1].weapon != 0) {
				var winner = winnerIndex();
				if (winner != -1)
					$scope.players[winner].win();
					
				reset();
			}
		};
		var connect = function(rep) {
			if ($scope.players.length == 1)
				socket.io.emit('existingPlayer', { name: $scope.players[0].name, lobby: $scope.players[0].lobby });
			else {
				$scope.selfIndex = 0;
				$scope.otherIndex = 1;
			}

			$scope.players.push(new Player(rep.name, $scope.players.length, rep.lobby));
		};
		var connectExisting = function(rep) {
			if ($scope.players.length == 1) { 
				$scope.players.unshift(new Player(rep.name, 0, rep.lobby));
				$scope.players[1].shift(1);
				$scope.selfIndex = 1;
				$scope.otherIndex = 0;
			}
		};
		socket.syncPlayers([refresh, connect, connectExisting]);
		$scope.connect = function(info) {
			socket.io.emit('roomConnect', { name: info.name, lobby: info.lobby });
			$scope.inLobby = true;
		};
		$scope.select = function(weapon) {
			$scope.players[$scope.selfIndex].select(weapon);
			socket.io.emit('action', $scope.players[$scope.selfIndex]);
		};
		$scope.confirm = function() {
			$scope.players[$scope.selfIndex].confirm(true);
			socket.io.emit('action', $scope.players[$scope.selfIndex]);
		};

		$scope.$on('$destroy', function () {
			socket.unsyncPlayers();
		});
	}]);
