var angular_app = angular.module('nriApp',[]);


// Model service
angular_app.factory('models',["$http",function($http){
	var list_models = function(){
		return $http.get("models/list");
	}
	var static_path = "static/models/"
	var get_model_path = function(name){
		//TODO this should give filetype based on where
		return static_path+name+"/"+name+".json";
	}
	return{
		list_models: list_models,
		get_model_path: get_model_path
	}

}]);

//MAIN CONTROLLER
angular_app.controller('mainController',["$scope","models","simulation", "ros",function($scope, models, simulation, ros){
	$scope.posToMove = undefined;
	$scope.positions =  [];
	$scope.pos = new THREE.Vector3();
	$scope.rot = new THREE.Vector3();
	$scope.objects = simulation.getObjects();
	$scope.models = [];
	$scope.savedPlans = [];
	$scope.plan = [];
	var compliantControl = false;
	//setup functions
	ros.getPositions().success(function(value){
			$scope.positions = value;
	});

	$scope.previewPosition = function(){
		var vec = $scope.posToMove.pose.position;
		simulation.preview(vec);
	}

	$scope.moveTo = function(){
		ros.moveTo($scope.posToMove.id);
	}
	
	$scope.compliantControl= function(){
		compliantControl = !compliantControl;
		ros.compliantControl(compliantControl);
	}
	models.list_models().success(function(value){
		objList = value.map(function(item){
			obj = { name: item};
			return obj;
		});
		$scope.models = objList; 
	});
	$scope.formSubmit = function(e){
		simulation.addObject("environment",$scope.selected.name, $scope.pos );
	}
	$scope.expandField = function(e){
		$scope.objects = simulation.getObjects();
		var el = e.srcElement;
		var id = el.getAttribute("data-for");
		var target = document.getElementById(id);
		if(target.style.display == "none"){
			target.style.display = "block";
		}else{
			target.style.display = "none";
		}
	}
	$scope.savePos = function(){
		ros.savePosition($scope.poseName);
	}
	$scope.updateEditor = function(){
		simulation.moveObject($scope.selected, $scope.pos );
		simulation.rotateObject($scope.selected, $scope.rot);
		simulation.scaleObject($scope.selected, $scope.scale);
	}
	$scope.makePlan = function(){
		ros.makePlan($scope.planName,$scope.plan)
	}	
	$scope.addToPlan = function(){
		$scope.plan.push($scope.posToAdd);
	}
}]);





