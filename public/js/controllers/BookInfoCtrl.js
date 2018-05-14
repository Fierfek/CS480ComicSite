var bookInfo = angular.module('BookInfoCtrl',[]);

bookInfo.controller('BookInfoController', function($scope, $route, RestApiClientService) {

	$scope.list;

	RestApiClientService.get("/book/" + $route.current.params.bookID).then(function(response){

		$scope.book = response;

		/*$scope.list = $scope.book.issueList.split(',');
		
		for (var i = 0; i < $scope.list.length; i++) {
			if($scope.list[i] == "0") {
				$scope.list.splice(i, i+1);
			}
		}*/
		
		//$scope.numIssues = $scope.list.length;
		
	});
});