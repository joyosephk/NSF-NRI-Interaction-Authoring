angular_app.factory('ros',['$http', function($http){
	//routes for ros related functionality
	var getPositions = function(){
	  return $http.get('/positions/get');
	}
	var savePosition = function(name){
		return $http.get('/positions/save/'+name);
	}
	var moveTo = function(id){
		return $http.get('/positions/move/'+id);

	}
	var compliantControl = function(flag){
		return $http.get('/forcecontrol/'+flag)	
	}
	return {
		getPositions: getPositions,
		savePosition: savePosition,
		moveTo: moveTo,
		compliantControl: compliantControl

	}
}])
