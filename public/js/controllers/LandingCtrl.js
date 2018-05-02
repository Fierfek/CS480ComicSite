var landingPage = angular.module('LandingCtrl',[]);

landingPage.controller('LandingPage', function($scope, $http) {
	$scope.tagline = 'To the moon and back!';
	//$scope.books = LandingFactory.getBooks();
	
	$http.get('/api/book').then(function(response) {
		//return response.data;
		console.log("yo, we got a response from the server!");
		$scope.books = response.data;
		
		for (var i = 0; i < $scope.books.length; i++) {
			var list = $scope.books[i].issueList.split(',');
			$scope.books[i].numberOfIssues = list.length;
		}
	});	
	
	console.log($scope);
});

landingPage.factory('LandingFactory', function($http) {
	var getBooks = function() {
		console.log("call the server");
		$http.get('/api/book').then(function(response) {
			return response.data;
			console.log("yo, we got a response from the server!")
		});	
	};
	
	return {
		getBooks
	}
});