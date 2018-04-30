angular.module('appRoutes', ['ngRoute']).config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/landing.html',
            controller: 'LandingPage'
        })
		.when('/', {
            templateUrl: '/views/profile.html',
            //controller: 'LandingPage'
        });
    $locationProvider.html5Mode(true);
});