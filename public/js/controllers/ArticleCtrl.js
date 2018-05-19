articlePage= angular.module('ArticleCtrl',[]);

articlePage.controller('ArticleController',function($scope,$route, RestApiClientService){

	RestApiClientService.get('/article/'+$route.current.params.articleID).then(function(response){
		$scope.article=response;
		console.log($scope.article);
		$scope.date = new Date( $scope.article.timestamp);
	});
	
	RestApiClientService.get('/article/').then(function(response){
		$scope.articleList=response;
	});
	
	/*RestApiClientService.get('/book/').then(function(response){
		$scope.books=response;
	});
	
	RestApiClientService.get('/issue/').then(function(response){
		$scope.issue=response;
	});*/
	
	
	$scope.createComment = function (articleData) {

        RestApiClientService.post('/functions/articleComment',
			{
				article: articleData
			}
		).then(function(result) {
			if(result.status == "success") {
				$location.path('/article/' + result.id);
			}
		});
	}	
	
});
