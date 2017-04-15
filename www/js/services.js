angular.module('starter.services', [])

.factory('load_playlists', [function(){
    
    var obj = {};
    obj.till = 0;
    
    obj.getUrl = function(genre){
		obj.till = obj.till + 5;
		obj.str="http://52.25.228.105/load_playlists.php?till=" + obj.till + "&genre=" + genre; // pass the value to url	
		return obj.str;
	};

    return obj;
}])

.factory('load_admin', function($http) {
    var obj = {};

    obj.getUrl = function(){
		//obj.str="http://127.0.0.1/load_admin.php";
        obj.str="http://52.25.228.105/load_admin.php";
        return obj.str;
	};
    return obj;
})

.factory('load_admin_songRequests', function($http) {
        //http://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime        
        return {
            get : function() {
                return $http.get('http://52.25.228.105/load_admin_requests.php');
                //return $http.get('http://127.0.0.1/load_admin_requests.php');
            }
        }
})

.factory('load_admin_shoutOuts', function($http) {
        //http://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime        
        return {
            get : function() {
                return $http.get('http://52.25.228.105/load_admin_shoutOuts.php');
                //return $http.get('http://127.0.0.1/load_admin_shoutOuts.php');
            }

        }
});


