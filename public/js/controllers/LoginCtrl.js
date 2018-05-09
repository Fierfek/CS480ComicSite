var loginPage = angular.module('LoginCtrl', []);

loginPage.controller('LoginController', function ($scope, $rootScope, $location, RestApiClientService) {
 
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
 
    $scope.doLogin = function (user) {
        RestApiClientService.post('/signedIn', {
            user: user
        }).then(function(result) {
			if(result){
				$rootScope.loggedIn = result;
				$location.path('profile');
				console.log($rootScope);
            }else {
				$scope.error='user not found';
			}
	});	};
});

  