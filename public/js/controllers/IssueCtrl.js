var issuePage = angular.module('IssueCtrl',[]);

issuePage.controller('IssueController',function($scope,$route,$filter ,RestApiClientService,PersistanceService){
		
	$scope.rate = 5; //delete it.
	$scope.label="more";
	var user=PersistanceService.getCookieData();
	var date = new Date();
	var comment={};
	var commentsList = [];
	var show;
	
		//sort by
	$scope.sortBy=["oldest-newest","newest-oldest","A-Z","Z-A"];
	$scope.sortByOption={};
	
	//convert timestamp to data string
	$scope.setTime= function(time){
		date.setTime(time);
		return date.toLocaleString();
	};
	
	//get the issue information
	RestApiClientService.get('/issue/'+$route.current.params.issueID).then(function(response){
		$scope.issue=response;
		$scope.rating={current:3, max:5};
		$scope.getSelectedRating= function (rating){
			console.log(rating);
		}
	});
	
	//get the writers
	RestApiClientService.get('/query/issueWriters/byIssue/'+$route.current.params.issueID).then(function(response){
		$scope.writers=response;
	});
	
	//get the characters
	RestApiClientService.get('/query/issueCharacters/byIssue/'+$route.current.params.issueID).then(function(response){
		$scope.characters=response;
	});
	
	//get the illustrators
	RestApiClientService.get('/query/issueIllustrators/byIssue/'+$route.current.params.issueID).then(function(response){
		$scope.illustrators=response;
	});
	
	var getCommentObject=function(){
		comment.userId=user.user;
		comment.issueId=$route.current.params.issueID;
		comment.rating=0;
		comment.timestamp=Date.now();
		comment.comment=$scope.commentBox;
	}
	
	//create a comment
	$scope.createComment = function () {
		
		getCommentObject();
		console.log(comment);
        RestApiClientService.post('/functions/comment',
			{
				comment: comment
			}
		).then(function(result) {
			//if(result.status == "success") {
				addComment();
				resetComment();
			//}
		});
	}
	
	//get list of comments
	RestApiClientService.get('/query/comments/byIssue/'+$route.current.params.issueID).then(function(response){
		$scope.comments=response;
		commentsList = response;
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
	
	$scope.isHidden = function(){
		if(show){
			show=false;
			$scope.label="more";
		}else{
			show=true;
			$scope.label="less";
			
		}
	};
	
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



