var bg = angular.module('BackgroundCtrl',[]);

bg.controller('background',function($scope, backgroundService) {
	$scope.bgService = backgroundService;
	$scope.bodyBg={
		"background-repeat": 'no-repeat',
		"background-size": 'cover'
	};
	
});

bg.factory('backgroundService',[function(){
	var currentBackgoundClass= {background:comics.png};
	return {
		setCurrentBg: function(imageUrl){
			currentBackgoundClass={background:imageUrl}; //change to url(imageUrl)
		},
		
		getCurrentBg: function(){
			return currentBackgoundClass;
		}
	};
}]);