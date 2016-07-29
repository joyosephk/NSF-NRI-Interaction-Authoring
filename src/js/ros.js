angular_app.factory('ros',['$http', function($http){
	var url ="http://cd46b0f1.ngrok.io"
	//routes for ros related functionality
	var getPositions = function(){
	  return $http.get(url+'/positions/get');
	}
	var savePosition = function(name){
		return $http.get(url+'/positions/save/'+name);
	}
	var moveTo = function(id){
		return $http.get(url+'/positions/move/'+id);

	}
	var compliantControl = function(flag){
		return $http.get(url+'/forcecontrol/'+flag)	
	}
	var getPlans = function(){
		return $http.get(url+'/plans/get');
	}
	var makePlan = function(taskname, positions ){
		return $http.post(url+'plans/make/'+taskname, positions);
	} 
	//move from one pose to another and save that movement as a plan
  var moveAndSavePath = function(id ){
		return $http.get(url+'/plans/individual/'+id);	
	}

	var executePlan = function(id){
		return $http.get(url+'/plans/move/'+id);
	}

	return {
		getPositions: getPositions,
		savePosition: savePosition,
		moveTo: moveTo,
		compliantControl: compliantControl,
		makePlan: makePlan,
		executePlan: executePlan,
		getPlans: getPlans,
		moveAndSavePath: moveAndSavePath
	}
}]);
