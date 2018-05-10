var issuePage = angular.module('IssueCtrl',[]);

landingPage.controller('IssuePage',[function($scope,$route, RestApiClientService){
	
	RestApiClientService.get('/issue'+$route.currentParameters.IssueID).then(function(response){
		$scope.issue=response;
	});
}]);