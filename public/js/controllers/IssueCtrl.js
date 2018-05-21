var issuePage = angular.module('IssueCtrl',[]);

issuePage.controller('IssueController',function($scope,$route, RestApiClientService,PersistanceService){
		
	$scope.rate = 5; //delete it.
	
	var user=PersistanceService.getCookieData();
	var date = new Date();
	
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
	
	
	//create a comment
	$scope.createComment = function (comment) {
		comment.userId=user.user;
		comment.issueId=$route.current.params.issueID;
		comment.rating=0;
		console.log(comment);
        RestApiClientService.post('/functions/comment',
			{
				comment: comment
			}
		).then(function(result) {
			if(result.status == "success") {
				console.log("result: "+result)
				$route.current.reload();
				
			}
		});
	}
	
	//get list of comments
	RestApiClientService.get('/query/comments/byIssue/'+$route.current.params.issueID).then(function(response){
		$scope.comments=response;
		for (var i = 0; i < $scope.comments.length; i++) {
			RestApiClientService.get("/userFavorites/" + $scope.comments[i].userId).then(function(response){
				for(var j = 0; j < $scope.comments.length; j++) {
					$scope.comments[j].username = response.username;
				}		
			});
		}
	});
	
	//use in the synopsys 
	var show=false;
	$scope.label="more";
	$scope.isHidden = function(){
		if(show){
			show=false;
			$scope.label="more";
		}else{
			show=true;
			$scope.label="less";
			
		}
	};
});

//star rating
issuePage.directive('startRating',function(){
	return {
		restrict:'A'+
		 '<li ng-repeat="star in stars" ng-class="star">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function (scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
			console.log('issue page');
        }
    }
});



