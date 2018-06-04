var bookInfo = angular.module('BookInfoCtrl',[]);

bookInfo.controller('BookInfoController', function($scope, $rootScope, $route, RestApiClientService, PersistanceService) {

	$scope.list;
	$scope.showFollow = true;
	$scope.showFollow = true;
	
	if($rootScope.loggedIn) {
		RestApiClientService.get("/userFollows/" + $rootScope.key.user).then(function(response) {
			var bookFollows = response.books.split(',');
			bookFollows.shift();
			if(bookFollows.find(checkForBook)) {
				$scope.showFollow = false;
			}
		});
	}
	
	var checkForBook = function(id) {
		if(parseInt(id) == $route.current.params.userId) {
			return true;
		} else {
			return false;
		}
	}

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
		
		for(var i = 0; i < response.length; i++) {
			response[i].rating = 0;
			RestApiClientService.get('/query/issueRating/byIssue/' + $scope.issueList[i].issueID).then(function(response) {
				
				if(response[0]) {
					for(var j = 0; j < $scope.issueList.length; j++) {
						if($scope.issueList[j].issueID == response[0].issueID) {
							for(var k = 0; k < response.length; k++) {
								$scope.issueList[j].rating += response[k].rating;
							}
							$scope.issueList[j].rating /= response.length;
							$scope.issueList[j].rating = Math.round($scope.issueList[j].rating );
						}
					}
				}

			});
		}
	});
	
	
	$scope.follow = function() {
		var userId = PersistanceService.getCookieData().user;
		
		$scope.showFollow = false;
		
		RestApiClientService.post('/functions/followBook',{
			userId: userId,
			followBook: $route.current.params.bookID
		}).then(function(result) {
			if(result.status = "success") {
				
			} else {
				
			}
		});
	}
});