var app = angular.module('navigationBarApp', []);
app.controller('NavController', function($scope) {
    $scope.data= ["Book tittle","Writer","Illustrator","Character","Volume","Issue","Year"];
	$scope.search="search";
	$scope.getSearchInfo=function(info){
		$scope.search=document.getElementById(info).value;
	}
});