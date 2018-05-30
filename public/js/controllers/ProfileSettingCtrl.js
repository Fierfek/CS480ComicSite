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
		console.log(userInfo);
	});
	
	$scope.updateUsername= function(){
		console.log("update username");
		RestApiClientService.post("/functions/changeUsername",{
			user:$scope.user
		}).then(function(result){
			if (result=="success"){
				$window.alert("Save Changes");
			}
		})
	}
	
	$scope.updateEmail= function(){
		console.log("update email");
		RestApiClientService.post("/functions/changeEmail",{
			user:$scope.user
		}).then(function(result){
			if (result=="success"){
				$window.alert("Save Changes");
			}
		})
	}
	
	$scope.updateQuestions= function(){
		console.log("update questions");
		RestApiClientService.post("/functions/changeQuestion",{
			user:$scope.user
		}).then(function(result){
			if (result=="success"){
				$window.alert("Save Changes");
			}
		})
	}
	
	$scope.updatePassword= function(){
		console.log("update password");
		
		if (!angular.equals(userInfo.password,$scope.user.current)){
			$window.alert("Current password is wrong");
		}else if (angular.equals($scope.user.password,$scope.user.confirmPass)){
			RestApiClientService.post("/functions/changePassword",{
				user:$scope.user
			}).then(function(result){
				if (result=="success"){
					$window.alert("Save Changes");
				}
			})
		}else 
			$window.alert("password No Match")
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
		
});