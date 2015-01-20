'use strict';

angular.module('rousseauPlatoCiceroApp')
	.controller('PlayCtrl', ['$scope', '$http', 'Player', 'socket', function ($scope, $http, Player, socket) {
		$scope.players = [];
		$scope.inLobby = false;
		$scope.con = {};
		$scope.selfIndex = 0;
		var refresh = function(player) {
			$scope.players[player.index].refresh(player);
		};
		var connect = function(rep) {
			if ($scope.players.length == 1)
				socket.io.emit('existingPlayer', { name: $scope.players[0].name, lobby: $scope.players[0].lobby });

			$scope.players.push(new Player(rep.name, $scope.players.length, rep.lobby));
			console.log($scope.players)
		};
		var connectExisting = function(rep) {
			if ($scope.players.length == 1) { 
				$scope.players.unshift(new Player(rep.name, $scope.players.length, rep.lobby));
				$scope.selfIndex = 1;
			}
		};
		socket.syncPlayers([refresh, connect, connectExisting]);
		$scope.connect = function(info) {
			socket.io.emit('roomConnect', { name: info.name, lobby: info.lobby });
			$scope.inLobby = true;
		}
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
