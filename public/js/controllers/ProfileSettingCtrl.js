var setting = angular.module('ProfileSettingCtrl', []);

profile.controller('ProfileSettingController', function($scope,$rootScope, $route, RestApiClientService,$window) {
	var userInfo
	$scope.user={};
	$scope.user.userID=$route.current.params.userId;
	$scope.isVerify=false;
	$scope.password="";
	$scope.message="";
		
	RestApiClientService.get('/query/user/securityQuestions/'+$route.current.params.userId).then(function(response){
		$scope.security=response;
		getSecurityQuestion();
	});
	
	var getSecurityQuestion=function(){

		$scope.user.question1=$scope.security.question1;
		$scope.user.question2=$scope.security.question2;
		$scope.user.answer1=$scope.security.answer1;
		$scope.user.answer2=$scope.security.answer2;
	}
	
	RestApiClientService.get('/query/user/'+$route.current.params.userId).then(function(response){
		userInfo=response;
		console.log(userInfo.username)
	});
	
	$scope.updateUsername= function(){
		$scope.user.username=$scope.user.username.toLowerCase();
		if($scope.user.username){
			RestApiClientService.post("/functions/changeUsername",{
				user:$scope.user
			}).then(function(result){
				if (result.status=="success"){
					$scope.message="Save Changes";
					$scope.resetUser();
				}
			})
		}
	}

	$scope.updateEmail= function(){
		if ($scope.user.email){
			RestApiClientService.post("/functions/changeEmail",{
				user:$scope.user
			}).then(function(result){
				if (result.status=="success"){
					$scope.message="Save Changes";
					$scope.resetUser();
				}
			})
		}else
			$scope.message="email is incomplete";
		
	}
	
	$scope.updateQuestions= function(){
		if ($scope.user.question1 || $scope.user.question2 || $scope.user.answer1 || $scope.user.answer2){
			RestApiClientService.post("/functions/changeQuestion",{
				user:$scope.user
			}).then(function(result){
				if (result.status=="success"){
					$scope.message="Save Changes";
				}
			})
		}
	}
	
	$scope.updatePassword= function(){
		if (!angular.equals(userInfo.password,$scope.user.current)){
			$scope.message="Current password is wrong";
		}else if (angular.equals($scope.user.password,$scope.user.confirmPass)){
			RestApiClientService.post("/functions/changePassword",{
				user:$scope.user
			}).then(function(result){
				if (result.status=="success"){
					$scope.mesage="Save Changes";
					$scope.resetUser();
				}
			})
		}else 
			$scope.message="password No Match"
	}

	$scope.verifyPassword= function(){
		if (angular.equals(userInfo.password,$scope.password))
			$scope.isVerify=true;
		else
			$scope.message="wrong password";
	}
	
	$scope.resetMessage= function(){
		$scope.message="";
		$scope.password="";
	}
	
	$scope.resetUser=function(){
		$scope.user={};
		$scope.user.userID=$route.current.params.userId;
		getSecurityQuestion();
	}
		
});