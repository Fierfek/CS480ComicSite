var app= angular.module('appRoutes', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $routeProvider
		.when('/profile'/*/:userId'*/, {
            templateUrl: '/views/profile.html',
            controller: 'ProfileController',
			
        })
		.when('/login', {
            templateUrl: '/views/login.html',
            controller: 'LoginController',
			
        })
        .when('/signup', {
            templateUrl: '/views/signup.html',
            controller: 'SignupController',
			
        })
		.otherwise({
			redirectTo: '/',
			templateUrl: '/views/landing.html',
           controller: 'LandingPage',
			
		});
    $locationProvider.html5Mode(true);
}]);

//Update title
app.run(['$location', '$rootScope', function($location, $rootScope) {

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous)
    {
		if(current.$$route) {
            // Set current page title
			$rootScope.title = current.$$route.title;
		}
    });
}]);