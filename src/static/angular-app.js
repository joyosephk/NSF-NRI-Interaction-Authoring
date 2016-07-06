var angular_app = angular.module('nriApp',[]);


// Model service
angular_app.factory('models',["$http",function($http){
	var list_models = function($scope){
		return $http.get("models/list");
		
	}
	return{
		list_models: list_models
	}

}]);

//MAIN CONTROLLER
angular_app.controller('mainController',["$scope","models",function($scope, models){
	$scope.models = ['test'];
	models.list_models().success(function(value){
		//$scope.models = value;
		console.log($scope);
	});
}]);





