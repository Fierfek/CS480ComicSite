var signUpPage = angular.module('SignupCtrl', []);

signUpPage.controller('SignupController', function ($scope, $rootScope, $routeParams, $location, $http, RestApiClientService) {
 
    $scope.signup = {};
 
    $scope.signup = {username:'',password:'',email:'',question1:'',answer1:'',question2:'',answer2:''};
 
    $scope.signUp = function (customer) {
        RestApiClientService.post('signup', {
            customer: customer
        }).then(function (results) {
            RestApiClientService.toast(results);
            if (results.status == "success") {
                $location.path('profile');
            }
        });
    };
 
});



