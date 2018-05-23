var articlePage = angular.module('CreateArticleCtrl',[]);

articlePage.controller('CreateArticleController', function($scope, $location, RestApiClientService) {
	
	$scope.article = {};
	
    $scope.createArticle = function (articleData) {

		if ($scope.article.title && $scope.article.author && $scope.article.body){
			
			RestApiClientService.post('/functions/article',{
				article: articleData
			}
			).then(function(result) {
				if(result.status == "success") {
					$location.path('/article/' + result.id);
				}
			});
		}
	}		
});



