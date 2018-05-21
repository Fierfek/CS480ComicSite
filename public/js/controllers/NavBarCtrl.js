var navBar = angular.module('NavBarCtrl', []);

navBar.controller('NavBarController', function($scope, $rootScope, $location, PersistanceService, RestApiClientService) {
	$scope.searchTest = 'Advanced Search';
	$scope.data= ["Book title","Writer","Illustrator","Character","Volume","Issue","Year"];
	
	$rootScope.results = {};
	var key = PersistanceService.getCookieData();
	
	$scope.category = "Category";
	
	if(key) {
		$rootScope.key = key;
		$rootScope.loggedIn = true;
	}

	$scope.startSearch = function() {
		if($scope.category != "Category") {
			$location.search('category', $scope.category);
			$location.search('param', $scope.search);
			$location.path('/search');
		}
	}
	
	$scope.setCategory = function(data) {
		$scope.category = data;
	}
	
	$scope.logOut = function () {
		$rootScope.loggedIn=false;
		PersistanceService.clearCookieData();
    };	
});