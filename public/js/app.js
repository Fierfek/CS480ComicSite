var comicBash = angular.module('comicBash', ['appRoutes', 'LandingCtrl', 'NavBarCtrl','ProfileCtrl', 'LoginCtrl','SignupCtrl','Service','Directives','BackgroundCtrl']);

comicBash.directive('navbar', function() {
	return {
		restrict:'E',
		templateUrl: '/views/navBar.html'
	};
});