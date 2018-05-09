var bookInfo = angular.module('BookInfoCtrl',[]);

bookInfo.controller('BookInfoController', function($scope, RestApiClientService) {
	
	RestApiClientService.get('/book').then(function(response) {
		
		$scope.books = response;
		
		for (var i = 0; i < $scope.books.length; i++) {
			var list = $scope.books[i].issueList.split(',');
			$scope.books[i].numberOfIssues = list.length;
		}
	});	
});