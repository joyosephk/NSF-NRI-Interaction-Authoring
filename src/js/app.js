var angular_app = angular.module('nriApp',[]);
//MAIN CONTROLLER


angular_app.controller('mainController',["$scope","models","simulation", "ros",function($scope, models, simulation, ros){
	$scope.posToMove = undefined;
	$scope.graspVal = 0;
	$scope.positions =  [];
	$scope.pos = new THREE.Vector3();
	$scope.rot = new THREE.Vector3();
	$scope.objects = simulation.getObjects();
	$scope.models = [];
	$scope.savedPlans = [];
	$scope.plan = [];
	$scope.selectedPlan = undefined;
	ros.compliantControl(false);	
	$scope.compliantControl = false;
	//default function for http failure
	var httpFailure = function(err){
		console.log(err);
	}
	//setup functions
	ros.getPositions().then(function(value){
			$scope.positions = value.data;
	},httpFailure);
	ros.getPlans().then(function(value){
		value = value.data
		var arr = [];
		var keys = Object.keys(value);
		for(i in keys){
			value[keys[i]].name = keys[i];
			arr.push(value[keys[i]]);
		}
		$scope.savedPlans = value;
	},httpFailure);
	$scope.previewPosition = function(){
		console.log($scope.posToMove);
		var vec = $scope.posToMove.position;
		simulation.previewPoint(vec);
	}
	$scope.previewPlan = function(){
		console.log($scope.selectedPlan);
		simulation.previewPath($scope.selectedPlan);
	}
	$scope.moveTo = function(){
		ros.moveTo($scope.posToMove.id);
	}
	
	$scope.compliantControlTog = function(){
		$scope.compliantControl = !$scope.compliantControl;
		ros.compliantControl($scope.compliantControl);
	}
	models.list_models().then(function(value){
		objList = value.data.map(function(item){
			obj = { name: item};
			return obj;
		},httpFailure);
		$scope.models = objList; 
	});
	$scope.formSubmit = function(e){
		simulation.addObject("environment",$scope.selected.name, $scope.pos );
	}

	$scope.expandField = function(e){
		var el = e.target;
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
		$scope.posToAdd.graspVal = $scope.graspVal;
		$scope.plan.push($scope.posToAdd);
	}
	$scope.executePlan = function(){
		ros.executePlan($scope.selectedPlan);
	}
	$scope.makeIndividualPlan = function(){
		ros.moveAndSavePath($scope.posToMove.id)
	}
}]);





