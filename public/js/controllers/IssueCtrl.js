var issuePage = angular.module('IssueCtrl',[]);

issuePage.controller('IssueController',function($scope, $route, RestApiClientService){
		
	RestApiClientService.get('/issue/' + $route.current.params.issueID).then(function(response){
		$scope.issue = response;
	});
	
	/*RestApiClientService.get('/issueWriter/'+$route.current.params.issueID).then(function(response){
		$scope.writer=response;
	});*/
	
	/*RestApiClientService.get('/issueCharacter/'+$route.current.params.issueID).then(function(response){
		$scope.character=response;
	});*/
	
	/*RestApiClientService.get('/issueIllustrator/'+$route.current.params.issueID).then(function(response){
		$scope.illustrator=response;
	});*/
	
	/*RestApiClientService.get('/comment/'+$route.current.params.issueID).then(function(response){
		$scope.comments=response;
	});*/
});

