var issuePage = angular.module('IssueCtrl',[]);

issuePage.controller('IssueController',function($scope,$route, RestApiClientService){
	console.log('/issue/' + $route.current.params.issueID);
	
	RestApiClientService.get('/issue/'+$route.current.params.issueID).then(function(response){
		$scope.issue=response;
		console.log(response);
	});
	
	/*RestApiClientService.get('/issueWriter/'+$route.current.params.issueID).then(function(response){
		$scope.writer=response;
	});
	
	RestApiClientService.get('/issueCharacter/'+$route.current.params.issueID).then(function(response){
		$scope.character=response;
	});
	
	RestApiClientService.get('/issueIllustrator/'+$route.current.params.issueID).then(function(response){
		$scope.illustrator=response;
	});
	
	RestApiClientService.get('/comment/'+$route.current.params.issueID).then(function(response){
		$scope.comments=response;
	});*/
	
	var user;
	$scope.isUser=function (user){
		return this.user==user;
	};
});

