var loginPage = angular.module('LoginCtrl', []);

loginPage.controller('LoginController', function ($scope, $rootScope, $location, RestApiClientService, PersistanceService) {
 
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
 
    $scope.doLogin = function (user) {

        RestApiClientService.post('/functions/signIn', {
            user: user
        }).then(function(result) {
			if (result){
				console.log(result);
				PersistanceService.setCookieData(result.userId, result.sessionId);
				$rootScope.loggedIn = result.signedIn;
				$location.path("/profile/" + result.userId);
			}else {
				$scope.error='user not found';
			}
		});     
    };
});
  