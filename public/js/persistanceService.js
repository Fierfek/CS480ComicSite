angular.module('Persistance',['ngCookies'])

.factory("PersistanceService", ['$cookies',	
	function ($cookies) {
		return {
			setCookieData: function(userId, sessionId) {
				var apiKey = {};
				apiKey.user = userId;
				apiKey.sessionId = sessionId;
				
				$cookies.put("apiKey", JSON.stringify(apiKey));
			},
			
			getCookieData: function() {
				var json = $cookies.get("apiKey");
				if(json) {
					var apiKey = JSON.parse(json.toString());
					return apiKey;
				}
			},
			
			clearCookieData: function() {
				$cookies.remove("apiKey");
			}
		}
	}
]);