var loginPage = angular.module('LoginCtrl', []);

loginPage.controller('LoginController', function ($scope, $rootScope, $location,$window, RestApiClientService, PersistanceService) {
 
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
	$scope.forgotMode=false;
	$scope.newPasswordMode=false;
	$scope.message="";
	$scope.user={};
 
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
	
	$scope.verifyEmail= function(email){
		console.log(email);
		RestApiClientService.get("/query/byEmail/" + email).then(function(result){
			$scope.user= result;
			if(result.length == 1){
				$scope.newPasswordMode=true;
				$scope.forgotMode=false;
			}else
				$scope.message="email not found";
		});
	}
	
	$scope.updatePassword= function(){
		console.log("update password");
		if (angular.equals($scope.user.password,$scope.user.confirmPass)){
			RestApiClientService.post("/functions/changePassword",{
				user:$scope.user
			}).then(function(result){
				if (result=="success"){
					$scope.message="Save Changes";
				}
			})
		}else 
			$scope.message="password No Match";
	}
	
	$scope.resetMessage = function(){
		$scope.message="";
	}
	
});
  