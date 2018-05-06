var loginPage = angular.module('LoginCtrl', []);

loginPage.controller('LoginController', function ($scope, RestApiClientService) {
 
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
 
    $scope.doLogin = function (user) {
        RestApiClientService.post('login', {
            user: user
        }).then(function (results) {
           // RestApiClientService.toast(results);
            if (results.status == "success") {
				$rootScope.currentUser=user;
                $location.path('profile/+user._id'); //user._id or other name
            }else {
				$scope.error='user not found';
			}
        });
    };
});
  