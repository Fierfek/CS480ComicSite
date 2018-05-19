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
			var call = "";
			switch($scope.category) {
				case "Book title": break;
				case "Writer": call = "/query/issueWriters/byWriter/"; break;
				case "Illustrator": call = "/query/issueIllustrators/byIllustrator/"; break;
				case "Character": call = "/query/issueCharacters/byCharacter/"; break;
				case "Volume": break;
				case "Issue": break;
				case "Year": break;
				case "user": break;
			}
			call += $scope.search;
			
			$rootScope.results.category = $scope.category;
			
			RestApiClientService.get(call).then(function(response) {
				if(response) {
					$rootScope.results.data = response;
					
					$location.path('/search');
				}
			});
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