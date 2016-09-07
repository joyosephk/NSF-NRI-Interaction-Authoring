angular_app.factory('ros',['$http','utils', function($http, utils){
	var url = utils.url? utils.url : "";
	var currentPlan = [];
	var makePlanObject = function(arr){
		//array of pose objects
		var dict = {"path": null}
		arr = arr.map(function(el){
			obj = {
				id : el.id,
				graspVal: el.graspVal,
				name: el.name,
				position: el.position
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

	var executePlan = function(plan){
		executePlanHelper(plan,0);
	}
	var index = 0;
	var executePlanHelper = function(plan, index){
		if(index >= plan.length) return;
		executePlanListener(plan,index).success(function(){
			index++;
			executePlanHelper(plan, index);	
		});
	}

	var executePlanListener = function(plan, index){
		if(index < plan.length){
			return $http.post(url+'/plans/execute', plan[index]);
		}
		else return;
	}
	var addFunction = function(func){
		if(!url){
			return () => {console.warn("running in no-ros mode, most functionality is dead"); return new Promise((a,b)=>{}) }
		}
		return func
	}
	var regeneratePlan = function(){
		return $http.get(url+'/plan/regenerate_plan');
	}
	var getPlans = function(){
		return $http.get(url+'/plan/get');
	}

	return {
		getPositions: addFunction(getPositions),
		savePosition: addFunction(savePosition),
		moveTo:addFunction(moveTo),
		compliantControl: addFunction(compliantControl),
		makePlan:addFunction(makePlan),
		executePlan:addFunction(executePlan),
		getPlans:addFunction(getPlans),
		moveAndSavePath: moveAndSavePath,
		regeneratePlan: addFunction(regeneratePlan),
		getPlans: (getPlans)
	}
}]);
