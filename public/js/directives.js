var app=angular.module('Directives',[]);

app.directive('focus', function() {
    return function(scope, element) {
        element[0].focus();
    }      
});

app.directive('starRating',function() {
		return {
			restrict : 'A',
			template : '<ul class="rating">' + ' <li ng-repeat="star in stars"   ng-click="toggle($index)" class="fa fa-star-o">'+ ' </li>'+ '</ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
					scope.stars = [];
					for ( var i = 0; i < scope.max; i++) {
						scope.stars.push({
						filled : i < scope.ratingValue
						});	
					}
				};

				scope.toggle = function(index) {
					scope.ratingValue = index + 1;
					scope.onRatingSelected({
						rating : index + 1
					});
				};

				scope.$watch('ratingValue',function(oldVal, newVal) {
					if (newVal) {
						updateStars();
					}
				});
		}
	};
});

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);