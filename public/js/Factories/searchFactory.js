angular.module('search').factory('SearchFactory', function($http){

	var Books = [
		"Superman", "Batman", "Spiderman"
	];

	function getBooks() {
		return $http.get('/api/books/').then(function(response){
			return new Search(response.data);
		});
	};

	return Book;
});
