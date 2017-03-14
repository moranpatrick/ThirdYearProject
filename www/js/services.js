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

        return {
            get : function() {
                return $http.get('http://127.0.0.1/load_admin.php');
            }

        }
});


