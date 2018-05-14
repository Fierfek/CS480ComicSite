var issueCreator = angular.module('CreateIssueCtrl', []);

issueCreator.controller('CreateIssueController', function ($scope, $route, $location, RestApiClientService) {
 
    $scope.createIssue = function (issue) {
		
		var file = $scope.issueCover;
		
		var fd = new FormData();
		
        fd.append('file', file);
		fd.append('title', $scope.issue.title);
		fd.append('writer', $scope.issue.writer);
		fd.append('characters', $scope.issue.characters);
		fd.append('illustrators', $scope.issue.illustrators);
		fd.append('year', $scope.issue.year);
		fd.append('volume', $scope.issue.volume);
		fd.append('issueNum', $scope.issue.issueNum);
		fd.append('summary', $scope.issue.summary);
		fd.append('synopsis', $scope.issue.synopsis);
		fd.append('bookId', $route.current.params.bookID); //Don't move this!
		
        RestApiClientService.post('/functions/createIssue', fd, {
			transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function (results) {
            if (results.status == "success") {
                $location.path('/issue/' + results.issueId);
			}else {
				$scope.error='issue cannot be created';
			}
        });
    };
});



