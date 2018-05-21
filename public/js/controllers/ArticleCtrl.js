articlePage= angular.module('ArticleCtrl',[]);

articlePage.controller('ArticleController',function($scope,$route, RestApiClientService,PersistanceService,$location){
	
	var user=PersistanceService.getCookieData();
	$scope.articleMode=true;
	
	$scope.date = new Date();
	
	$scope.setTime= function(time){
		$scope.date.setTime(time);
		return $scope.date.toLocaleString();
	};
	
	RestApiClientService.get('/article/'+$route.current.params.articleID).then(function(response){
		$scope.article=response;
		$scope.setTime( $scope.article.timestamp);
	});
	
	
	//RestApiClientService.get('/query/article/newest').then(function(response){
	RestApiClientService.get('/article/').then(function(response){
		$scope.articleList=response;
	});
	
	RestApiClientService.get('/issue/').then(function(response){
		$scope.issueList=response;
	});
	
	
	$scope.createComment = function (comment) {
		comment.userId=user.user;
		comment.articleId=$route.current.params.articleID;
		console.log(comment);
        RestApiClientService.post('/functions/articleComment',
			{
				comment: comment
			}
		).then(function(result) {
			if(result.status == "success") {
				console.log("result: "+result)
				$route.reload();
				
			}
		});
	}	
	
	RestApiClientService.get('/query/articleComments/byArticle/'+$route.current.params.articleID).then(function(response){
		$scope.comments=response;
		for (var i = 0; i < $scope.comments.length; i++) {
			RestApiClientService.get("/userFavorites/" + $scope.comments[i].userId).then(function(response){
				for(var j = 0; j < $scope.comments.length; j++) {
					$scope.comments[j].username = response.username;
				}		
			});
		}
	});
	
	$scope.issueOption = function(){	
		$scope.articleMode = false;
	};
	
	$scope.articleOption = function(){	
		$scope.articleMode = true;
	};
});
