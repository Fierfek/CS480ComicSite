var navBar = angular.module('NavBarCtrl', []);

navBar.controller('NavBarController', function($scope, $rootScope, $location, PersistanceService, RestApiClientService) {

	$scope.data= ["Book Title","Writer","Illustrator","Character","Issue Title","All Books"];//"Book by Year"
	$scope.categoryMode=true;
	$scope.search="chose a category";
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
			if($scope.category == "All Books"){
				$scope.search="book"
			}
			$location.search('param', $scope.search);
			$location.path('/search');
		}
	}
	
	$scope.setCategory = function(data) {
		$scope.category = data;
		if($scope.category == "All Books"){
			$scope.search="All books"
			$scope.categoryMode=true;
		}
		else{
			$scope.search="";
			$scope.categoryMode=false;
		}
	}
	
	$scope.logOut = function () {
		$rootScope.loggedIn=false;
		PersistanceService.clearCookieData();
    };	
});