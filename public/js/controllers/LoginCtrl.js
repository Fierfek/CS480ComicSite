var loginPage = angular.module('LoginCtrl', []);

loginPage.controller('LoginController', function ($scope, $rootScope, $location,$window, RestApiClientService, PersistanceService) {
 
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
 
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
});
  