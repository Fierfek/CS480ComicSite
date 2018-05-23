var app= angular.module('appRoutes', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/profile/:userId', {
            templateUrl: '/views/profile.html',
            controller: 'ProfileController',
			title:'Profile'
        })
		.when('/profile/:userId/setting', {
            templateUrl: '/views/profileSetting.html',
            controller: 'ProfileSettingController',
			title:'Setting'
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
            controller: 'CreateBookController',
            title:'Book Info'
        })
        .when('/book/:bookID', {
            templateUrl: '/views/bookInfo.html',
            controller: 'BookInfoController',
            title:'Book Info'
        })
		.when('/issue/:issueID', {
            templateUrl: '/views/issueInfo.html',
            controller: 'IssueController',
            title:'Issue'
		})
		.when('/book/:bookID/createIssue', {
            templateUrl: '/views/createIssue.html',
            controller: 'CreateIssueController',
            title:'Create Issue'
        })		
		.when('/article/:articleID', { 
            templateUrl: '/views/article.html',
            controller: 'ArticleController',
			title:'Article'
        })	
		.when('/article', { 
            templateUrl: '/views/createArticle.html',
            controller: 'CreateArticleController',
			title:'Create Article'
        })
		.when('/search', {
            templateUrl: '/views/searchResult.html',
            controller: 'SearchResultController',
            title:'Search'
        })
		.otherwise({
			redirectTo: '/',
			templateUrl: '/views/landing.html',
            controller: 'LandingPage',
			title:'Comic Bash!'
		});
    $locationProvider.html5Mode(true);
}]);


app.run(['$location', '$rootScope', function($location, $rootScope) {

	$rootScope.$on("$locationChangeStart", function (event, newUrl, oldUrl) {
		$rootScope.Path = $location.path();
		$rootScope.NewUrl = newUrl;
		$rootScope.OldUrl = oldUrl;
	});
	
	$rootScope.$on("$locationChangeSuccess", function (event, newUrl, oldUrl) {
		$rootScope.Path = $location.path();
		$rootScope.NewUrl = newUrl;
		$rootScope.OldUrl = oldUrl;
		
		if(newUrl.$$route) {
            // Set current page title
			$rootScope.title = current.$$route.title;	
		}
  });
	
}]);
