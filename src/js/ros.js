angular_app.factory('ros',['$http', function($http){
	//routes for ros related functionality
	var getPositions = function(){
	  return $http.get('/positions/get');
	}
	var savePosition = function(name){
		return $http.post('/positions/save',{
			name: name
		});
	}
	var moveTo = function(id){
	
	}
	return {
		getPositions: getPositions,
		savePosition: savePosition,
		moveTo: moveTo
	}
}])
