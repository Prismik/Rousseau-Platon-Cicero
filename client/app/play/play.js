'use strict';

angular.module('rousseauPlatoCiceroApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/play', {
        templateUrl: 'app/play/play.html',
        controller: 'PlayCtrl'
      });
  });
