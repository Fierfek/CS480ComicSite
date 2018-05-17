var profile = angular.module('ProfileCtrl', []);

profile.controller('ProfileController', function($scope,$rootScope, $route, RestApiClientService) {
	
	RestApiClientService.get("/userFavorites/" + $route.current.params.userId).then(function(response){
		$scope.user=response;
		console.log(response);
	});
	
	$scope.editEnabled = function(){
		$scope.bio = "Welcome to my profile!";
		$scope.editModeEnabled = false;
		
		$scope.enableEditor = function(){
			$scope.editModeEnabled = true;
			$scope.editableBio = $scope.bio;
		};
		$scope.disableEditor = function(){
			$scope.editModeEnabled = false;
		};
		$scope.save = function(){
			$scope.bio = $scope.editableBio;
			$scope.disableEditor();
		};
	}:
	
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