var signUpPage = angular.module('SignupCtrl', []);

signUpPage.controller('SignupController', function ($scope, $rootScope, $location, RestApiClientService,PersistanceService) {
 
    $scope.signup = {};
 
    $scope.createAccount = function (user) {
		console.log(user);
        RestApiClientService.post('/functions/signup', {
            user: user
        }).then(function (result) {
			//if (result.signedIn){
			if (result){	
				$rootScope.loggedIn=true;
				PersistanceService.setCookieData(result.userId, result.sessionId);
                $location.path("/profile/" + result.userId);
			}else {
				$scope.error='account cannot be created';
			}
        });
    };
});



