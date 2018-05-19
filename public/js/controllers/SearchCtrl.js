var createBook = angular.module('SearchResultCtrl',[]);

createBook.controller('SearchResultController', function($scope, $rootScope, $location) {
	var search = $rootScope.results;
	
	$scope.type = search.category;
	
	$scope.data = search.data;
	
	console.log($scope.data);
});	