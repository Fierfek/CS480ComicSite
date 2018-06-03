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
		//case "Book by Year": break;
		//case "Issue by Year": call="/query/issue/byYear/"; break;
		case "User": call= "/query/byUserName/";break;
		case "All Books": call="/";break;
	}
	call += search.param;
	RestApiClientService.get(call).then(function(response) {
		$scope.data = [];
		switch(search.category) {
			case "Book Title": 
				for (var i = 0; i < response.length; i++) {
					RestApiClientService.get("/book/" + response[i].bookID).then(function(res){
						$scope.data.push(res);
					})
				}
				$scope.message = "Found " + response.length + " book with the title: " + search.param;
				break;
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
		//	case "Book by Year": break;
			case "Issue by Year":
				/*for (var i = 0; i < response.length; i++) {
					RestApiClientService.get("/issue/" + response[i].issueID).then(function(res){
						$scope.data.push(res);
					});
				}
				$scope.message = "Found " + response.length + " issues in: " + search.param;*/
			break;
			case "User":
				for (var i = 0; i < response.length; i++) {
					RestApiClientService.get("/userFavorites/" + response[i].userID).then(function(res){
						$scope.data.push(res);
					});
				}
				$scope.message = "Found " + response.length + " user(s): " + search.param.toLowerCase();
			break;
			case "All Books":
				$scope.data=response;
				$scope.message = "Found " + response.length + " books ";
			break;
		}

	});
});	