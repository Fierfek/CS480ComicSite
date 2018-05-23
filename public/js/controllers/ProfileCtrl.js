var profile = angular.module('ProfileCtrl', []);

	
profile.controller('ProfileController', function($scope,$rootScope, $route, RestApiClientService) {
	
	$scope.userId=$route.current.params.userId;
	$scope.showEdit = false;
	$scope.editMode = false;
	
	RestApiClientService.get("/userFavorites/" +$scope.userId ).then(function(response){
		$scope.user = response;
		console.log('favorite:' + response);
	});
	
	$scope.edit = function(){	
		$scope.editMode = true;
	};
	
	$scope.cancelEdit = function() {
		exitEdit();
	}
	
	$scope.submitEdit = function() {
		//Submit stuff then exit
		exitEdit();
	}
	
	var exitEdit = function() {
		$scope.editMode = false;
	}
	
	/*$scope.getImage = function () {
		
		console.log($scope);
		
		var file = $scope.myFile;
		
		var fd = new FormData();
        fd.append('file', file);
		fd.append('name', $scope.user.name);
		
        RestApiClientService.post("/functions/image", fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    };*/
});