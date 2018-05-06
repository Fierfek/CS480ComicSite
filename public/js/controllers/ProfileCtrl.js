var profile = angular.module('ProfileCtrl', []);

profile.controller('ProfileController', function($scope) {

	$scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('landing');
        });
    }
});