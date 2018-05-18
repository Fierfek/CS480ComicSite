var app=  angular.module('Persistance',[]);

app.factory("PersistanceService", ['$cookies',
	var apiKey = {};
	
	function ($cookies) {
		return {
			setCookieData: function(userId, key) {
				apiKey.user = userId;
				apiKey.key = key;
				
				$cookies.put("apiKey", apiKey);
			},
			
			getCookieData: function() {
				apiKey = $cookies.get("apiKey");
			},
			
			clearCookieData: function() {
				apiKey = {};
				$cookies.remove("apiKey");
			}
		}
	}
]);