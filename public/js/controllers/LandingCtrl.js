var landingPage = angular.module('LandingCtrl',[]);

landingPage.controller('LandingPage', function($scope, $rootScope, $routeParams, $location, $http, RestApiClientService) {
	$scope.tagline = 'To the moon and back!';

	
	RestApiClientService.get('book').then(function(response) {
	
		console.log("yo, we got a response from the server!");
		
		$scope.books = response;
		
		for (var i = 0; i < $scope.books.length; i++) {
			var list = $scope.books[i].issueList.split(',');
			$scope.books[i].numberOfIssues = list.length;
		}
	});	
	console.log($scope);
});