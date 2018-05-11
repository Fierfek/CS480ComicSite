var issueCreator = angular.module('CreateIssueCtrl', []);

issueCreator.controller('CreateIssueController', function ($scope, $rootScope, $location, RestApiClientService) {
 
 
    $scope.createIssue = function (issue) {
        RestApiClientService.post('/functions/addIssue', {
            user: user
        }).then(function (results) {
        
            if (results.status == "success") {
				$rootScope.loggedIn=true;
                $location.path('/issue/+ issue._id');
			}else {
				$scope.error='issue cannot be created';
				$rootScope.loggedIn=false;
			}
        });
    };
});



