angular_app.factory('utils', [function(){
	var exports = {}
	exports.url = undefined;
	exports.test = true;
	var addFunction = function(func){
		if(!url && test){
			return () => {console.warn("running in no-ros mode, most functionality is unavailable"); return new Promise((a,b)=>{})}
		}
		return func
	}
	
	exports.addFunction = addFunction;

	exports.stringsAsObject = function(arr){
		 arr = arr.map(function(el){
			return {name: el}
		});
		return arr;
	}
	return exports;

}]);
