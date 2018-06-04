var issuePage = angular.module('IssueCtrl',[]);

issuePage.controller('IssueController',function($scope, $rootScope, $route,$filter ,RestApiClientService,PersistanceService){
		
	$scope.label="more";
	var user=PersistanceService.getCookieData();
	var date = new Date();
	var comment={};
	var commentsList = [];
	var show;
	var previousRating=0;
	var previouVotes=1;
	
	$scope.rating = 0;
	var rated = false;
	
		//sort by
	$scope.sortBy=["oldest-newest","newest-oldest","A-Z","Z-A"];
	$scope.sortByOption={};
	
	//convert timestamp to data string
	$scope.setTime= function(time){
		date.setTime(time);
		return date.toLocaleString();
	};
	
	if($rootScope.loggedIn) {
		RestApiClientService.get('/ratings/' + $route.current.params.issueID + '/' + PersistanceService.getCookieData().user).then(function(response) {
			if(response){
				$scope.rating = response.rating;
				previousRating=$scope.rating;
				rated = true;
			}
		});
	}
	
	//get the issue information
	RestApiClientService.get('/issue/'+$route.current.params.issueID).then(function(response){
		$scope.issue = response;
		$scope.issue.rating=0;
		$scope.issue.votes=0;
		RestApiClientService.get('/query/issueRating/byIssue/' + response.issueID).then(function(response) {
			if(response[0]) {	
				$scope.issue.votes=response.length;
				for(var k = 0; k < $scope.issue.votes; k++) {
					$scope.issue.rating += response[k].rating;
				}
				$scope.issue.rating /= $scope.issue.votes;
				$scope.issue.rating = Math.round($scope.issue.rating);
			}
		});
	});
	
	//get the writers
	RestApiClientService.get('/query/issueWriters/byIssue/'+$route.current.params.issueID).then(function(response){
		$scope.writers=response;
		console.log(response);
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
			if(result.status == "success") {
				addComment();
				resetComment();
			}
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
	
	$scope.rate = function(rating) {
		if ($scope.issue.votes != 0)
			previouVotes=$scope.issue.votes;
		if(!rated) {
			RestApiClientService.post('/functions/rateIssue',{
				issueID: $route.current.params.issueID,
				userID: PersistanceService.getCookieData().user,
				rating: rating
			}
			).then(function(result) {
				if(result.status == "success") {
					
				}
			});
			$scope.issue.votes+=1;
			rated=true;
		} else {
			RestApiClientService.post('/functions/changeIssueRating',{
				issueID: $route.current.params.issueID,
				userID: PersistanceService.getCookieData().user,
				rating: rating,
			}
			).then(function(result) {
				if(result.status == "success") {
				}
			});
		}
		$scope.issue.rating *=previouVotes ;
		console.log("issue: "+$scope.issue.rating+ "previous: "+previousRating + " rating: "+rating + "votes: "+$scope.issue.votes)
		$scope.issue.rating += rating;
		$scope.issue.rating -=previousRating;
		$scope.issue.rating /= ($scope.issue.votes);
		$scope.issue.rating = Math.round($scope.issue.rating);
		previousRating=rating;
	}
	
});



