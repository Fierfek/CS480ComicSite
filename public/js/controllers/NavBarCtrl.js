var navBar = angular.module('NavBarCtrl', []);

navBar.controller('NavBarController', function($scope) {
	$scope.searchTest = 'Advanced Search';
	$scope.data= ["Book tittle","Writer","Illustrator","Character","Volume","Issue","Year"];
	$scope.search="search";
	$scope.getSearchInfo=function(info){
		$scope.search=document.getElementById(info).value;
	}
});