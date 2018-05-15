var bookInfo = angular.module('BookInfoCtrl',[]);

bookInfo.controller('BookInfoController', function($scope, $route, RestApiClientService) {

	$scope.list;

	RestApiClientService.get("/book/" + $route.current.params.bookID).then(function(response){

		$scope.book = response;

		console.log($scope.book.publishDate);

		$scope.year = new Date($scope.book.publishDate).getFullYear();
		monthNum = new Date($scope.book.publishDate).getMonth();
		const monthNames = ["January", "February", "March", "April", "May", "June",
  		"July", "August", "September", "October", "November", "December"
		];

		$scope.month = monthNames[monthNum];


		/*$scope.list = $scope.book.issueList.split(',');
		
		for (var i = 0; i < $scope.list.length; i++) {
			if($scope.list[i] == "0") {
				$scope.list.splice(i, i+1);
			}
		}*/
		
		//$scope.numIssues = $scope.list.length;
		
	});
	RestApiClientService.get("/api/query/issue/byBook/:bookId" + $route.current.params.bookID).then(function(response){

		$scope.issue = response;
		//console.log(response);
	});
});