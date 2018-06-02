var landingPage = angular.module('LandingCtrl',[]);

landingPage.controller('LandingPage', function($scope, $route, RestApiClientService) {
	$scope.tagline = 'To the moon and back!';
	$scope.issueMode = true;


	RestApiClientService.get('/book').then(function(response) {
		
		$scope.books = response;
		for (var i = 0; i < $scope.books.length; i++) {
			RestApiClientService.get("/query/issue/byBook/" + $scope.books[i].bookID).then(function(response){
				if(response[0]) {
					for(var j = 0; j < $scope.books.length; j++) {
						if($scope.books[j].bookID == response[0].bookId) {
							$scope.books[j].numberOfIssues = response.length;
						}
					}
				}
			});
		}
		
	});	

	RestApiClientService.get("/issue").then(function(response){
		$scope.issueList = response;
		$scope.begin=response.length-11;
	});
	
	RestApiClientService.get("/article").then(function(response){
		$scope.articleList = response;
	});

	$scope.issueOption = function(){	
		$scope.issueMode = true;
	};
	
	$scope.bookOption = function(){	
		$scope.issueMode = false;
	};
	
	
	
}); 