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


