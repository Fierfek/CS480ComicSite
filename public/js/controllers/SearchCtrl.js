var createBook = angular.module('SearchResultCtrl',[]);

createBook.controller('SearchResultController', function($scope, $rootScope, $location, RestApiClientService) {
	var search = $location.search();
	
	$scope.category = search.category;
	
	var call = "";
	switch(search.category) {
		case "Book title": break;
		case "Writer": call = "/query/issueWriters/byWriter/"; break;
		case "Illustrator": call = "/query/issueIllustrators/byIllustrator/"; break;
		case "Character": call = "/query/issueCharacters/byCharacter/"; break;
		case "Volume": break;
		case "Issue": break;
		case "Year": break;
		case "user": break;
	}
	call += search.param;
	
	RestApiClientService.get(call).then(function(response) {
		$scope.data = [];
		
		switch(search.category) {
			case "Book title": break;
			
			case "Writer":
				for (var i = 0; i < response.length; i++) {
					RestApiClientService.get("/issue/" + response[i].issueID).then(function(res){
						$scope.data.push(res);
					});
				}
				$scope.message = search.param + " wrote " + response.length + " issues";
				break;
				
			case "Illustrator":
				for (var i = 0; i < response.length; i++) {
					RestApiClientService.get("/issue/" + response[i].issueID).then(function(res){
						$scope.data.push(res);
					});
				}
				$scope.message = search.param + " illustrated " + response.length + " issues";
				break;
				
			case "Character": 
				for (var i = 0; i < response.length; i++) {
					RestApiClientService.get("/issue/" + response[i].issueID).then(function(res){
						$scope.data.push(res);
					});
				}
				$scope.message = search.param + " appears in " + response.length + " issues";
				break;
			
			case "Volume": break;
			case "Issue":
				for (var i = 0; i < response.length; i++) {
					RestApiClientService.get("/issue/" + response[i].issueID).then(function(res){
						$scope.data.push(res);
					});
				}
				$scope.message = "Found " + response.length + " issues with the title: " + search.param;
				break;
			case "Year": break;
			case "user": break;
		}
	});
});	