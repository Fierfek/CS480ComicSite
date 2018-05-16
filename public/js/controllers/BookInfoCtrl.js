var bookInfo = angular.module('BookInfoCtrl',[]);

bookInfo.controller('BookInfoController', function($scope, $route, RestApiClientService) {

	$scope.list;

	RestApiClientService.get("/book/" + $route.current.params.bookID).then(function(response){

		$scope.book = response;

		$scope.year = new Date($scope.book.publishDate).getFullYear();
		monthNum = new Date($scope.book.publishDate).getMonth();
		const monthNames = ["January", "February", "March", "April", "May", "June",
  		"July", "August", "September", "October", "November", "December"
		];

		$scope.month = monthNames[monthNum];
		
	});
	RestApiClientService.get("/query/issue/byBook/" + $route.current.params.bookID).then(function(response){

		$scope.issueList = response;
		$scope.numOfIssues = response.length;
		console.log(response);
	});
});