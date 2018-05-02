var comicBash = angular.module('comicBash', ['appRoutes', 'LandingCtrl', 'NavBarCtrl','ProfileCtrl', 'LoginCtrl']);

comicBash.directive('navbar', function() {
	return {
		restrict:'E',
		templateUrl: '/views/navBar.html'
	};
});