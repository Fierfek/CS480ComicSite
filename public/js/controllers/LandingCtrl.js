var landingPage = angular.module('LandingCtrl',[]);

landingPage.controller('LandingPage', function($scope, RestApiClientService) {
	$scope.tagline = 'To the moon and back!';

	
	RestApiClientService.get('/book').then(function(response) {
		
		$scope.books = response;
		for (var i = 0; i < $scope.books.length && i<10; i++) {
			var list = $scope.books[i].issueList.split(',');
			$scope.books[i].numberOfIssues = list.length;
		}
	});	
	
	RestApiClientService.get('/issue').then(function(response) {
		
		$scope.issues = response;
	});	
	
});