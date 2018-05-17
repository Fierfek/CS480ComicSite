var landingPage = angular.module('LandingCtrl',[]);

landingPage.controller('LandingPage', function($scope, $route, RestApiClientService) {
	$scope.tagline = 'To the moon and back!';



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
		
		console.log($scope.books);
	});	
	
	RestApiClientService.get("/query/issue/byBook/2" ).then(function(response){

		$scope.issueList = response;
	});
}); 