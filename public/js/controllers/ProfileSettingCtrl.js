var setting = angular.module('ProfileSettingCtrl', []);

profile.controller('ProfileSettingController', function($scope,$rootScope, $route, RestApiClientService) {

	$scope.user={};
		
	RestApiClientService.get('/query/user/securityQuestions/'+$route.current.params.userId).then(function(response){
		$scope.security=response;
		console.log("response: "+response);
		getSecurityQuestion();
	});
	
	var getSecurityQuestion=function(){

		$scope.user.question1=$scope.security.question1;
		console.log("question1: "+ $scope.security.question1);
		$scope.user.question2=$scope.security.question2;
		$scope.user.answer1=$scope.security.answer1;
		$scope.user.answer2=$scope.security.answer2;
	}
	
	RestApiClientService.get('/query/user/'+$route.current.params.userId).then(function(response){
		var userInfo=response;
		console.log(userInfo);
	});
	

});