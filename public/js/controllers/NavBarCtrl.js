var navBar = angular.module('NavBarCtrl', []);

navBar.controller('NavBarController', function($scope) {
	$scope.searchTest = 'Advanced Search';
	$scope.data= ["Book tittle","Writer","Illustrator","Character","Volume","Issue","Year"];

	$scope.startSearch = function getSearch(search){
		var searchParams = search.searchData;
		console.log("Search for: " + searchParams);
	}
	
	$scope.category="Category";
	
	$scope.setCategory=function(name){
		$scope.category=name;
	};
	$scope.showProfile=true;
	$scope.showSeachBox=true;
	$scope.showLogin=true;
	$scope.showLogout=true;
	$scope.showSignUp=true;
	
	$scope.loginPage=function (){
		$scope.showProfile=false;
		$scope.showSeachBox=false;
		$scope.showSignUp=true;
	};
	
	$scope.profilePage=function (){
		$scope.showProfile=true;
		$scope.showSeachBox=true;
		$scope.showLogin=false;
		$scope.showSignUp=false;
	};
	
	$scope.buttonAppear=function(){
		$scope.showProfile=true;
		$scope.showSeachBox=true;
		$scope.showLogin=true;
		$scope.showSignUp=true;
	};
	
	$scope.buttonAppear=function(){
		$scope.showProfile=true;
		$scope.showSeachBox=true;
		$scope.showLogin=true;
		$scope.showSignUp=true;
	};
});