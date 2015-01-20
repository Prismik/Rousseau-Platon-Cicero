'use strict';

angular.module('rousseauPlatoCiceroApp')
	.controller('PlayCtrl', ['$scope', '$http', 'Player', 'socket', function ($scope, $http, Player, socket) {
		$scope.players = [];
		$scope.inLobby = false;
		$scope.con = {};
		var refresh = function(player) {
			if (player.index == 0) {
				$scope.players[0].refresh(player);
			}
			else {
				$scope.players[1].refresh(player);
			}
		};
		var connect = function(rep) {
			if ($scope.players.length == 1)
				socket.io.emit('existingPlayer', { name: $scope.players[0].name, lobby: $scope.players[0].lobby });

			$scope.players.push(new Player(rep.name, $scope.players.length, rep.lobby));
			console.log($scope.players)
		};
		var connectExisting = function(rep) {
			if ($scope.players.length == 1)
				$scope.players.unshift(new Player(rep.name, $scope.players.length, rep.lobby));
		};
		socket.syncPlayers([refresh, connect, connectExisting]);
		$scope.connect = function(info) {
			socket.io.emit('roomConnect', { name: info.name, lobby: info.lobby });
			$scope.inLobby = true;
		}
		$scope.select = function(weapon) {
			$scope.players[0].select(weapon);
			socket.io.emit('action', $scope.players[0]);
		};
		$scope.confirm = function() {
			$scope.players[0].confirm(true);
			socket.io.emit('action', $scope.players[0]);
		};

		$scope.$on('$destroy', function () {
			socket.unsyncPlayers();
		});
	}]);
