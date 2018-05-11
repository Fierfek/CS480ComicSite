var createBook = angular.module('CreateBookCtrl',[]);

createBook.controller('CreateBookController', function($scope, RestApiClientService) {
	
    $scope.newBook = function (user) {

        RestApiClientService.post('/book',
			{
				book: book
			}
		).then(function(result) {
			
		});
	}	
});