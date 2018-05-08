var issueInfo = angular.module('issueCtrl',[]);

issueInfo.controller('IssueInfoController', function($scope, RestApiClientService) {

	
	RestApiClientService.get('/issue').then(function(response) {
		
		$scope.issue = response;
		
		for (var i = 0; i < $scope.issue.length; i++) {
			var list = $scope.issue[i].issueList.split(',');
			$scope.issue[i].numberOfIssues = list.length;
		}
	});	
});