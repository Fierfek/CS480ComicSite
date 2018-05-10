var signUpPage = angular.module('SignupCtrl', []);

signUpPage.controller('SignupController', function ($scope, $rootScope, $location, RestApiClientService) {
 
    $scope.signup = {};
 
    $scope.createAccount = function (user) {
		
        RestApiClientService.post('signup', {
            user: user
        }).then(function (results) {
            if (results) {
				$rootScope.loggedIn=true;
                $location.path('profile');
			}else {
				$scope.error='account cannot be created';
				$rootScope.loggedIn=false;
			}
        });
    };
});



