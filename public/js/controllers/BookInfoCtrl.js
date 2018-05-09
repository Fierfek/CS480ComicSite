var bookInfo = angular.module('BookInfoCtrl',[]);

bookInfo.controller('BookInfoController', function($scope, $route, RestApiClientService) {
	
	console.log("book/" + $route.current.params.bookID);

	RestApiClientService.get("/book/" + $route.current.params.bookID).then(function(response){

		var books = response;

		console.log(books)




	});



   		
});