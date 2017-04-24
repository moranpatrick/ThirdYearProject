angular.module('starter.services', [])

.factory('load_playlists', [function(){
    
    var obj = {};
    obj.till = 0;
    
    obj.getUrl = function(genre){
		obj.till = obj.till + 5;
		obj.str="http://52.25.228.105/load_playlists.php?till=" + obj.till + "&genre=" + genre; // pass the v to url	
		return obj.str;
	};

    return obj;
}])

.factory('load_admin', function($http) {
    var obj = {};

    obj.getUrl = function(){
        obj.str="http://52.25.228.105/load_admin.php";
        return obj.str;
	};
    return obj;
})

//This factory makes a HTTP Get Request to run the php script and get requests
.factory('load_admin_songRequests', function($http) {    
        return {
            get : function() {
                return $http.get('http://52.25.228.105/load_admin_requests.php');
            }
        }
})

.factory('load_admin_shoutOuts', function($http) {  
        return {
            get : function() {
                return $http.get('http://52.25.228.105/load_admin_shoutOuts.php');
            }
        }
});


