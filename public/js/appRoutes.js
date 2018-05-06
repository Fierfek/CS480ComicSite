var app= angular.module('appRoutes', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/landing', {
            templateUrl: '/views/landing.html',
            controller: 'LandingPage'
        })
		.when('/profile', {
            templateUrl: '/views/profile.html',
            controller: 'ProfileController'
        })
		.when('/login', {
            templateUrl: '/views/login.html',
            controller: 'LoginController'
        })
        .when('/signup', {
            templateUrl: '/views/signup.html',
            controller: 'SignupController'
        })
		.otherwise({
			redirectTo: '/landing'
		});
    $locationProvider.html5Mode(true);
}]);