var profile = angular.module('ProfileCtrl', []);

profile.controller('ProfileController', function($scope,$rootScope, RestApiClientService) {
	
	$scope.user = {
		name: "William Hang",
		image: "http://via.placeholder.com/300x250"
	}
	
	$scope.getImage = function () {
		
		console.log($scope);
		
		var file = $scope.myFile;
		
		var fd = new FormData();
        fd.append('file', file);
		fd.append('name', $scope.user.name);
		
        RestApiClientService.post("/functions/image", fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    };
});