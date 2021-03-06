'use strict';

angular.module('rousseauPlatoCiceroApp')
	.factory('Player', function () {
		function Player(name, index, lobby) {
			this.index = index;
			this.score = 0;
			this.name = name;
			this.weapon = 0;
			this.choiceConfirmed = false;
			this.choiceSelected = false;
			this.lobby = lobby;
		}
		Player.prototype.refresh = function(json) {
			this.index = json.index;
			this.score = json.score;
			this.name = json.name;
			this.weapon = json.weapon;
			this.choiceConfirmed = json.choiceConfirmed;
			this.choiceSelected = json.choiceSelected;
			this.lobby = json.lobby;
		}
		Player.prototype.reset = function() {
			this.weapon = 0; 
			this.choiceConfirmed = false;
			this.choiceSelected = false;
		}
		Player.prototype.win = function() { this.score++; }; 
		Player.prototype.score = function() { return this.score; };
		Player.prototype.name = function() { return this.name; };
		Player.prototype.index = function() { return this.index; };
		Player.prototype.lobby = function() { return this.lobby; };
		Player.prototype.weapon = function() { return this.weapon; };
		Player.prototype.confirmed = function() { return this.choiceConfirmed; };
		Player.prototype.selected = function() { return this.choiceSelected; };
		Player.prototype.confirm = function(val) { this.choiceConfirmed = val; };
		Player.prototype.shift = function(val) { this.index = val; };
		Player.prototype.select = function(val) { 
			this.weapon = val; 
			this.choiceSelected = true; 
		};

		return Player;
	});
