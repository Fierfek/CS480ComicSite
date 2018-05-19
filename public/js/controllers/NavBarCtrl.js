var navBar = angular.module('NavBarCtrl', []);

navBar.controller('NavBarController', function($scope, $rootScope, PersistanceService) {
	$scope.searchTest = 'Advanced Search';
	$scope.data= ["Book title","Writer","Illustrator","Character","Volume","Issue","Year"];
	
	var key = PersistanceService.getCookieData();
	
	$scope.category = "Category";
	
	if(key) {
		$rootScope.key = key;
		$rootScope.loggedIn = true;
	}

	$scope.startSearch = function() {
		if($scope.category != "Category") {
			switch(catagory) {
				case "Book title": break;
				case "Writer": break;
				case "Illustrator": break;
				case "Character": break;
				case "Volume": break;
				case "Issue": break;
				case "Year": break;
			}
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