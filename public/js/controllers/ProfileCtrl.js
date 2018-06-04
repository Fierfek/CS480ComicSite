var profile = angular.module('ProfileCtrl', []);

	
profile.controller('ProfileController', function($scope,$rootScope, $route, RestApiClientService, PersistanceService) {
	
	$scope.userId = $route.current.params.userId;
	$scope.showEdit = false;
	$scope.editMode = false;
	$scope.books = [];
	$scope.users = [];
	var date = new Date();
	
	if($rootScope.loggedIn) {
		RestApiClientService.get("/userFollows/" + $rootScope.key.user).then(function(response) {
			var userFollows = response.users.split(',');
			userFollows.shift();
			if(userFollows.find(checkForUser)) {
				$scope.showFollow = false;
			}
		});
	}
	
	var checkForUser = function(id) {
		if(parseInt(id) == $route.current.params.userId) {
			return true;
		} else {
			return false;
		}
	}
	
	//convert timestamp to data string
	$scope.setTime= function(time){
		date.setTime(time);
		return date.toLocaleString();
	};
	
	RestApiClientService.get("/userFavorites/" + $scope.userId ).then(function(response) {
		$scope.user = response;
	});
	
	RestApiClientService.get("/userFollows/" + $scope.userId ).then(function(response) {
		
		var books = response.books.split(',');
		books.shift();
		
		for (var i = 0; i < books.length; i++) {
			RestApiClientService.get("/book/" + books[i]).then(function(response) {
				$scope.books.push(response);
			});
		}
		
		var users = response.users.split(',');
		users.shift();
		
		for (var i = 0; i < users.length; i++) {
			RestApiClientService.get("/userfavorites/" + users[i]).then(function(response) {
				$scope.users.push(response);
			});
		}
	});
	
	RestApiClientService.get("/query/events/byuser/" + $route.current.params.userId).then(function(response) {
		$scope.events = response;
		var done=false;
		var rating=0;
		
		for (var i = 0; i < $scope.events.length; i++) {
			if(angular.equals("followBook",$scope.events[i].type)){
				RestApiClientService.get("/book/" + $scope.events[i].data).then(function(response){		
					if(response){
						done=false;
						for(var j = 0; j < $scope.events.length && !done; j++) {
							if(angular.equals($scope.events[j].data,response.bookID) && angular.equals("followBook",$scope.events[j].type)) {
								$scope.events[j].info = response.title;
								done=true;
							}
						}
					}	
				});
			}
			if(angular.equals("followUser",$scope.events[i].type)){
				RestApiClientService.get("/userFavorites/" + $scope.events[i].data).then(function(response){
					if(response){
						done=false;
						for(var j = 0; j < $scope.events.length && !done; j++) {
							if(angular.equals($scope.events[j].data,response.userID) && angular.equals("followUser",$scope.events[j].type)) {
								$scope.events[j].info = response.username;
								done=true;
							}
						}
					}	
				});
			}
			
			if(angular.equals("rate",$scope.events[i].type)){
				var index=$scope.events[i].data.substr(0, $scope.events[i].data.indexOf(','));
				RestApiClientService.get("/issue/" + index).then(function(response){
					if(response){
						done=false;
						for(var j = 0; j < $scope.events.length && !done; j++) {
							if(angular.equals("rate",$scope.events[j].type) &&
							angular.equals($scope.events[j].data.substr(0, $scope.events[j].data.indexOf(',')),response.issueID.toString())){
								rating=$scope.events[j].data.substr($scope.events[j].data.length-$scope.events[j].data.indexOf(','));
								if(!angular.equals($scope.events[j].rating,rating)){
									$scope.events[j].info = response.title;
									$scope.events[j].rating=rating;
									done=true;
								}
							}
						}
					}	
				});
			}
		};
	});
	
	$scope.follow = function() {
		var userId = PersistanceService.getCookieData().user;
		
		$scope.showFollow = false;
		
		RestApiClientService.post('/functions/followUser',{
			userId: userId,
			followUser: $route.current.params.userId
		}).then(function(result) {
			if(result.status = "success") {
				
			} else {
				
			}
		});
	}
	
	$scope.edit = function() {	
		$scope.editMode = true;
	};
	
	$scope.cancelEdit = function() {
		exitEdit();
	}
	
	$scope.submitEdit = function() {
		updateProfile();
		exitEdit();
	}
	
	var exitEdit = function() {
		$scope.editMode = false;
	}
	
	$scope.isMyprofile = function(){		
		var isUser = false;
		if($rootScope.loggedIn){
			var cookieUserId = PersistanceService.getCookieData().user;
			if (cookieUserId == $scope.userId){
				isUser = true;
			}
		}
		return isUser;
	}
	
	$scope.signedIn = function() {
		return $rootScope.loggedIn;
	}
	
	var updateProfile = function () {
		var file = $scope.profilePicture;
		
		var fd = new FormData();
		fd.append('file', file);
		fd.append('bio', $scope.user.bio);
		
        RestApiClientService.post('/functions/updateProfile/' + $route.current.params.userId, fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		}).then(function (results) {
			if(results.status = "success") {
				$scope.user.bio = results.bio;
				$scope.user.profilePic = results.pic;
			}
		});
    };

});