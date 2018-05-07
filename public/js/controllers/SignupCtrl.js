var signUpPage = angular.module('SignupCtrl', []);

signUpPage.controller('SignupController', function ($scope, $rootScope, $location, RestApiClientService) {
 
    $scope.signup = {};
 
    $scope.signup = {username:'',password:'',email:'',question1:'',answer1:'',question2:'',answer2:''};
 
    $scope.signUp = function (user) {
        RestApiClientService.post('signup', {
            user: user
        }).then(function (results) {
            RestApiClientService.toast(results);
            if (results.status == "success") {
				$rootScope.loggedIn=true;
               // $location.path('user/+ user._id');
			}else {
				$scope.error='account cannot be created';
				$rootScope.loggedIn=false;
			}
        });
    };
 
});



