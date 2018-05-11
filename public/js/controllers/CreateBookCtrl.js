var createBook = angular.module('CreateBookCtrl',[]);

createBook.controller('CreateBookController', function($scope, RestApiClientService) {
	
    $scope.newBook = function (user) {

        RestApiClientService.post('/functions/book',
			{
				book: book
			}
		).then(function(result) {
			
		});
	}	
});