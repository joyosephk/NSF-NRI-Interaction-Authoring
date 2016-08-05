angular_app.factory('ros',['$http', function($http){
	var url ="http://b020ab43.ngrok.io"
	var makePlanObject = function(arr){
		//array of pose objects
		var dict = {"path": null}
		arr = arr.map(function(el){
			obj = {
				id : el.id,
				graspVal: 20,
				name: name

			}
			console.log(obj);
			return obj;
		});		
		dict['path'] = arr;
		console.log(dict)
		return dict;
	}
	
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
		plan = makePlanObject(positions)
		return $http({
			method:'POST',
			url: 	url+'/plans/make/'+taskname,
			data: plan
		} );
	} 
	//move from one pose to another and save that movement as a plan
  var moveAndSavePath = function(id ){
		console.log("making individual");
		return $http.get(url+'/plans/individual/'+id);	
	}

	var executePlan = function(name){
		return $http.get(url+'/plans/execute/'+name);
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
