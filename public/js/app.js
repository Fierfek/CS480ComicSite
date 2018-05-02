var comicBash = angular.module('comicBash', ['appRoutes', 'LandingCtrl', 'NavBarCtrl','ProfileCtrl']);

comicBash.directive('navbar', function() {
	return {
		restrict:'E',
		templateUrl: '/views/navBar.html'
	};
});

comicBash.directive('diHref', ['$location', '$route',function($location, $route) {
    return function(scope, element, attrs) {
        scope.$watch('diHref', function() {
            if(attrs.diHref) {
                element.attr('href', attrs.diHref);
                element.bind('click', function(event) {
                    scope.$apply(function(){
                        if($location.path() == attrs.diHref)
							$route.reload();
                    });
                });
            }
        });
    }
}]);