var app= angular.module('appRoutes', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $routeProvider
		.when('/profile'/*/:userId'*/, {
            templateUrl: '/views/profile.html',
            controller: 'ProfileController',
			title:'Profile'
        })
		.when('/login', {
            templateUrl: '/views/login.html',
            controller: 'LoginController',
			title:'Login'
        })
        .when('/signup', {
            templateUrl: '/views/signup.html',
            controller: 'SignupController',
			title:'Signup'
        })
        .when('/book', {
            templateUrl: '/views/createBook.html',
            controller: 'BookInfoController',
            title:'Book Info'
        })
        .when('/book/:bookID', {
            templateUrl: '/views/Book.html',
            controller: 'BookInfoController',
            title:'Book Info'
        })
        .when('/issue', {
            templateUrl: '/views/issueInfo.html',
            controller: 'IssueInfoController',
            title:'Issue Info'
        })
		.otherwise({
			redirectTo: '/',
			templateUrl: '/views/landing.html',
            controller: 'LandingPage',
			title: 'Comic Bash!'
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