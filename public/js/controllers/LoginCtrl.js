var loginPage = angular.module('LoginCtrl', []);

loginPage.controller('LoginController', function ($scope, $rootScope, $routeParams, $location, $http, RestApiClientService) {
 
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
 
    $scope.doLogin = function (customer) {
        RestApiClientService.post('login', {
            customer: customer
        }).then(function (results) {
           // RestApiClientService.toast(results);
            if (results.status == "success") {
                $location.path('profile');
            }
        });
    };
});
  