var navBar = angular.module('NavBarCtrl', []);

navBar.controller('NavBarController', function($scope) {
	$scope.searchTest = 'Advanced Search';
	$scope.data= ["Book title","Writer","Illustrator","Character","Volume","Issue","Year"];

	$scope.startSearch = function Search(search, searchFactory){
		var searchParams = search.searchData;
		console.log("Search for: " + searchParams);
		searchFactory.getBooks();
	}
});