angular_app.factory('utils', [function(){
	var exports = {}
	exports.url = "";
	exports.test = false;
	var addFunction = function(func){
		if(!url && exports.test){
			return () => {console.warn("running in no-ros mode, most functionality is unavailable"); return new Promise((a,b)=>{})}
		}
		return func
	}
	
	var charts = false;
	var chartsCallback = function(){
		charts = true;
		for(i in callbacks){
			callbacks[i]();
		}
	}
	var callbacks = []
	initCharts = function(){
		google.charts.load("current", {packages:["timeline"]});
		google.charts.setOnLoadCallback(chartsCallback);

	}
	exports.onChartsLoaded = function(funk){
		callbacks.push(funk);
	}
	exports.chartsLoaded = function(){
		return charts;
	}
	exports.addFunction = addFunction;

	exports.stringsAsObject = function(arr){
		 arr = arr.map(function(el){
			return {name: el}
		});
		return arr;
	}
	initCharts()
	return exports;

}]);
