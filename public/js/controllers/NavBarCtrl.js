var navBar = angular.module('NavBarCtrl', []);

navBar.controller('NavBarController', function($scope, $rootScope) {
	$scope.searchTest = 'Advanced Search';
	$scope.data= ["Book tittle","Writer","Illustrator","Character","Volume","Issue","Year"];

	$scope.startSearch = function getSearch(search){
		var searchParams = search.searchData;
		console.log("Search for: " + searchParams);
	}
	
	$rootScope.loggedIn = false;
	
	$scope.category="Category";
	
	$scope.setCategory=function(name){
		$scope.category=name;
	};
	
});