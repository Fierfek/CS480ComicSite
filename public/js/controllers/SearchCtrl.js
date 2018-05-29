var createBook = angular.module('SearchResultCtrl',[]);

createBook.controller('SearchResultController', function($scope, $rootScope, $location, RestApiClientService) {
	var search = $location.search();
	
	$scope.category = search.category;
	
	var call = "";
	switch(search.category) {
		case "Book Title": call="/query/byBook/"; break;
		case "Writer": call = "/query/issueWriters/byWriter/"; break;
		case "Illustrator": call = "/query/issueIllustrators/byIllustrator/"; break;
		case "Character": call = "/query/issueCharacters/byCharacter/"; break;
		case "Issue Title": call= "/query/byIssue/"; break;
		case "Book by Year": break;
		case "Issue by Year": break;
		case "user": break;
	}
	call += search.param;
	console.log("call: " + call);
	RestApiClientService.get(call).then(function(response) {
		$scope.data = [];
		console.log("response: " + response);
		switch(search.category) {
			case "Book Title": break;
				RestApiClientService.get("/book/" + response[i].bookID).then(function(res){
					$scope.data.push(res);
				})
				$scope.message = "Found " + response.length + " book with the title: " + search.param;
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
			case "Issue Title":
				for (var i = 0; i < response.length; i++) {
					RestApiClientService.get("/issue/" + response[i].issueID).then(function(res){
						$scope.data.push(res);
					});
				}
				$scope.message = "Found " + response.length + " issues with the title: " + search.param;
				break;
			case "Book by Year": break;
			case "Issue by Year": break;
			case "user": break;
		}
	});
});	