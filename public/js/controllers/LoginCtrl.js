var loginPage = angular.module('LoginCtrl', []);

loginPage.controller('LoginController', function ($scope, $rootScope, $location,$window, RestApiClientService, PersistanceService) {
 
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
	$scope.forgotMode=false;
	$scope.questionMode=false;
	$scope.newPasswordMode=false;
	$scope.message="";
	$scope.user={};
	$scope.security={};
 
    $scope.doLogin = function (user) {

        RestApiClientService.post('/functions/signIn', {
            user: user
        }).then(function(result) {
			if (result.signedIn){
				PersistanceService.setCookieData(result.userId, result.sessionId);
				$rootScope.loggedIn = result.signedIn;
				console.log("location: "+$rootScope.OldUrl);
				if($rootScope.OldUrl!=$location.path())
					$window.location = $rootScope.OldUrl;
				else
					$location.path('/profile'+result.userId);
			}else {
				$scope.error='user not found';
				$rootScope.NewUrl=$rootScope.OldUrl;
			}
		});     
    };
	
	$scope.forgot=function(){
		$scope.forgotMode=true;
	}
	
	$scope.verifyEmail= function(){
		RestApiClientService.get("/query/byEmail/" + $scope.user.email).then(function(result){
			$scope.user= result[0];
			if(result.length == 1){
				$scope.forgotMode=false;
				getQuestion($scope.user.userID);
				$scope.questionMode=true;
			}else
				$scope.message="email not found";
		});
		console.log("user " + $scope.user);
	}
	
	$scope.updatePassword= function(){
		console.log("update password " + $scope.user);
		if (angular.equals($scope.user.password,$scope.user.confirmPass)){
			RestApiClientService.post("/functions/changePassword",{
				user:$scope.user
			}).then(function(result){
				if (result.status=="success"){
					$scope.message="Save Changes";
				}
			})
		}else 
			$scope.message="password No Match";
	}
	
	var getQuestion=function (id){
		RestApiClientService.get('/query/user/securityQuestions/'+id).then(function(response){
			security=response;
			$scope.user.question1=security.question1;
			$scope.user.question2=security.question2;
		});
	}
	
	$scope.checkAnswer=function(){
		if(angular.equals(security.answer1,$scope.user.answer1) && angular.equals(security.answer2,$scope.user.answer2)){
			$scope.newPasswordMode=true;
			$scope.resetMessage();
			$scope.questionMode=false;
		}else
			$scope.message="wrong answer"
	}
	
	$scope.resetMessage = function(){
		$scope.message="";
	}
	
	$scope.goToLogin=function(){
		$scope.newPasswordMode=false;
		$scope.resetMessage();
		$scope.user={};
	}
	
});
  