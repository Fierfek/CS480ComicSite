var signUpPage = angular.module('SignupCtrl', []);

signUpPage.controller('SignupController', function ($scope, $rootScope, $location, RestApiClientService,PersistanceService) {
 
    $scope.signup = {};
 
    $scope.createAccount = function () {
        if (!$scope.signup.username||!$scope.signup.email||!$scope.signup.Password||!$scope.signup.passwordConfirm||!$scope.signup.question1||
			!$scope.signup.answer1||!$scope.signup.question2||!$scope.signup.answer2){
		}else if (!angular.equals($scope.signup.Password,$scope.signup.passwordConfirm))
			$scope.msg= "password No Match";
		else{

			RestApiClientService.post('/functions/signup', {
				user: $scope.signup
			}).then(function (results) {
				if (results.status == "success") {
					$rootScope.loggedIn = true;
					PersistanceService.setCookieData(results.userId, result.sessionId);
					$location.path('/user/' + results.userID);
				}else {
					$scope.error='account cannot be created';
				}
			});
		}
    };
	
	$scope.resetMsg=function(){
		$scope.msg="";
	}
});



