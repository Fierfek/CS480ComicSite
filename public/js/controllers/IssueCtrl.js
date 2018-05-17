var issuePage = angular.module('IssueCtrl',[]);

issuePage.controller('IssueController',function($scope,$route, RestApiClientService){
	console.log('/issue/' + $route.current.params.issueID);
	
	$scope.rate = 5;
	RestApiClientService.get('/issue/'+$route.current.params.issueID).then(function(response){
		$scope.issue=response;
		console.log(response);
	});
	
	RestApiClientService.get('/query/issueWriters/byIssue/'+$route.current.params.issueID).then(function(response){
		$scope.writers=response;
	});
	
	RestApiClientService.get('/query/issueCharacters/byIssue/'+$route.current.params.issueID).then(function(response){
		$scope.characters=response;
		console.log(response);
	});
	
	RestApiClientService.get('/query/issueIllustrators/byIssue/'+$route.current.params.issueID).then(function(response){
		$scope.illustrators=response;
	});
	
	RestApiClientService.get('/comment/'+$route.current.params.issueID).then(function(response){
		$scope.comments=response;
	});
	
	var user;
	$scope.isUser=function (user){
		return this.user==user;
	};
	
	var show=false;
	$scope.label="more";
	
	$scope.isHidden = function(){
		if(show){
			show=false;
			$scope.label="more";
		}else{
			show=true;
			$scope.label="less";
			
		}
	};
});



