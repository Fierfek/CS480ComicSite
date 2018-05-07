var loginPage = angular.module('LoginCtrl', []);

loginPage.controller('LoginController', function ($scope, $rootScope, $location, RestApiClientService) {
 
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
 
    $scope.doLogin = function (user) {
        RestApiClientService.ask('loggedIn', {
            user: user
        }).then(function (results) {
           // RestApiClientService.toast(results);
            if (results) {
				$rootScope.loggedIn = results;
                $location.path('profile/+user._id'); //user._id or other name
            }else {
				$scope.error='user not found';
			}
        });
    };
});
  