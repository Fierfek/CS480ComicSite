var bookInfo = angular.module('CreatBookCtrl',[]);

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