var navBar = angular.module('NavBarCtrl', []);

navBar.controller('NavBarController', function($scope, $rootScope, PersistanceService) {
	$scope.searchTest = 'Advanced Search';
	$scope.data= ["Book tittle","Writer","Illustrator","Character","Volume","Issue","Year"];
	
	var key = PersistanceService.getCookieData();
	
	if(key) {
		$rootScope.key = key;
		$rootScope.loggedIn = true;
	}

	$scope.startSearch = function getSearch(search){
		var searchParams = search.searchData;
		console.log("Search for: " + searchParams);
	}
	
	
	$scope.logOut = function () {
		$rootScope.loggedIn=false;
		PersistanceService.clearCookieData();
    };
    
	
	$scope.category="Category";
	
	$scope.setCategory=function(name){
		$scope.category=name;
	};
	
});