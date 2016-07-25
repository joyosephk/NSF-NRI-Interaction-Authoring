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
angular_app.controller('mainController',["$scope","models","simulation",function($scope, models, simulation){
	$scope.positions = simulation.getPositions();
	$scope.nextID = 0;
	$scope.pos = new THREE.Vector3();
	$scope.rot = new THREE.Vector3();
	$scope.objects = simulation.getObjects();
	$scope.models = [];
	$scope.moveArm = function(){
		simulation.moveArm()
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
		simulation.savePos($scope.name, scope.nextID);
		nextID++;
	}
	$scope.updateEditor = function(){
		//simulation.changeColor($scope.selected);
		simulation.moveObject($scope.selected, $scope.pos );
		simulation.rotateObject($scope.selected, $scope.rot);
		simulation.scaleObject($scope.selected, $scope.scale);
	}
}]);





