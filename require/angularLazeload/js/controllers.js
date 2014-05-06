'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', function($scope) {
	var myData = require('modules/data.js'),
		toUpperService = require('modules/toUpper.js');
	
	$scope.firstName = toUpperService.toUpper(myData.data.firstName);;
	$scope.lastName = toUpperService.toUpper(myData.data.lastName);;
	$scope.description = myData.data.description;
	
  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
