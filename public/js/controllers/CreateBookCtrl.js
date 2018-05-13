var createBook = angular.module('CreateBookCtrl',[]);

createBook.controller('CreateBookController', function($scope, $location, RestApiClientService) {
	
	$scope.book = {};
	
    $scope.createBook = function (bookData) {

        RestApiClientService.post('/functions/createBook',
			{
				book: bookData
			}
		).then(function(result) {
			if(result.status == "success") {
				$location.path('/book/' + result.id);
			}
		});
	}	
});