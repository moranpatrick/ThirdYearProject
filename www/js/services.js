angular.module('starter.services', [])

.factory('load_recent_playlist', [function(){
    console.log("IN FACTORY");
    var obj = {};
    obj.till = 0;
    
    obj.getUrl = function(){
		obj.till = obj.till + 5;
		obj.str="http://127.0.0.1/load_recent.php?till=" + obj.till; // pass the value to url
		
        console.log("URL: ", obj.str);
		return obj.str;
	};

    return obj;
}]);
