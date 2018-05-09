var bookInfo = angular.module('BookInfoCtrl',[]);

bookInfo.controller('BookInfoController', function($scope, $route, RestApiClientService) {
	
	console.log("book/" + $route.current.params.bookID);

	$scope.list;

	RestApiClientService.get("/book/" + $route.current.params.bookID).then(function(response){

		$scope.book = response;

		$scope.list = $scope.book.issueList.split(',');
		$scope.numIssues = $scope.list.length;
		
	});
});