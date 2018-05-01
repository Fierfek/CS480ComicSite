angular.module('appRoutes', ['ngRoute']).config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/landing.html',
            controller: 'LandingPage'
        })
		.when('/profile/', {
            templateUrl: '/views/profile.html',
            controller: 'ProfileControlller'
        })
		.otherwise({
			redirectTo: '/'
		});
    $locationProvider.html5Mode(true);
});