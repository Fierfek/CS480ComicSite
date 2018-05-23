articlePage= angular.module('ArticleCtrl',[]);

articlePage.controller('ArticleController',function($scope,$route, RestApiClientService,PersistanceService,$location,$filter){
	
	var user=PersistanceService.getCookieData();
	//article mode for the menu 
	$scope.articleMode=true;
	$scope.sortBy=["oldest-newest","newest-oldest","A-Z","Z-A"];
	$scope.sortByOption={};
	var comment={};
	$scope.comment={};//comment that is made
	var commentsList = [];
	$scope.date = new Date();
	
	//Convert the miliseconds to date
	$scope.setTime= function(time){
		$scope.date.setTime(time);
		return $scope.date.toLocaleString();
	};
	
	//get the current article
	RestApiClientService.get('/article/'+$route.current.params.articleID).then(function(response){
		$scope.article=response;
		$scope.setTime( $scope.article.timestamp);
	});
	
	
	//get the list of articles
	RestApiClientService.get('/query/article/newest').then(function(response){
	//RestApiClientService.get('/article/').then(function(response){
		$scope.articleList=response;
	});
	
	//get the list of issues 
	RestApiClientService.get('/issue/').then(function(response){
		$scope.issueList=response;
	});
	
	//get the comment object
	var getCommentObject=function(){
		comment.userId=user.user;
		comment.articleId=$route.current.params.articleID;
		comment.comment=angular.copy($scope.commentBox);
		comment.timestamp=Date.now();
	}
	
	//create comment 
	$scope.createComment = function () {
		getCommentObject();
        RestApiClientService.post('/functions/articleComment',
			{
				comment: comment
			}
		).then(function(result) {
		//	if(result.status == "success") {
				addComment();
				resetComment();	
			//}
		});
	}	
	
	//get the list of comment
	RestApiClientService.get('/query/articleComments/byArticle/'+$route.current.params.articleID).then(function(response){
		$scope.comments=response;
		commentsList = response;	
		$scope.comments = $filter('orderBy')(commentsList, "timestamp", false);
	
		for (var i = 0; i < $scope.comments.length; i++) {
			RestApiClientService.get("/userFavorites/" + $scope.comments[i].userId).then(function(response){
				if(response){
					for(var j = 0; j < $scope.comments.length; j++) {
						if($scope.comments[j].userId == response.userID) {
							$scope.comments[j].username = response.username;
						}
					}
				}
			});
		}
	});
	
	//set article mode when the issue list is show in the side menu
	$scope.issueOption = function(){	
		$scope.articleMode = false;
	};
	
	//set article mode true when the article list is show in the side menu
	$scope.articleOption = function(){	
		$scope.articleMode = true;
	};
	
	//comment menu
	$scope.commentMenu= function(){
		switch($scope.sortByOption){
			case "oldest-newest":
				$scope.comments = $filter('orderBy')(commentsList, "timestamp", false);
				break;
			case "newest-oldest":
				$scope.comments = $filter('orderBy')(commentsList, "timestamp", true);
				break;		
			case "A-Z":
				$scope.comments = $filter('orderBy')(commentsList, "username", false);
				break;
			case "Z-A":
				$scope.comments = $filter('orderBy')(commentsList, "username", true);
				break;		
		}
	};
	
	var addComment=function(){
		RestApiClientService.get("/userFavorites/" + comment.userId).then(function(response){
			comment.username = response.username;
			$scope.comments.push(angular.copy(comment));
		});
	}
	
	var resetComment=function(){
		$scope.commentBox="";
	}
});
