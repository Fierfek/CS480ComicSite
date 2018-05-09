var newBook = angular.module('BookInfoCtrl',[]);

bookInfo.controller('BookInfoController', function($scope, RestApiClientService) {
	
    $scope.newBook = function (user) {

        RestApiClientService.post('/book', {
            book: book
        }).then(function(result) {    
    };
}	
});