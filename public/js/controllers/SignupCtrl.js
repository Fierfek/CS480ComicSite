var signUpPage = angular.module('SignupCtrl', []);

signUpPage.controller('SignupController', function ($scope, $rootScope, $location, RestApiClientService,PersistanceService) {
 
    $scope.signup = {};
 
    $scope.createAccount = function (user) {
        RestApiClientService.post('/functions/signup', {
            user: user
        }).then(function (results) {
            //RestApiClientService.toast(results);
            if (results.status == "success") {
				$rootScope.loggedIn = true;
				PersistanceService.setCookieData(result.userId, result.sessionId);
                $location.path('/user/' + results.userId);
			}else {
				$scope.error='account cannot be created';
			}
        });
    };
});



