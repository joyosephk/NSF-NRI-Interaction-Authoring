//jshint asi: true
angular_app.controller('timelineViewController', ['$scope','utils', 'ros',function($scope,utils,ros ){
	$scope.startTime = function(){
		$scope.start = Date.now()
		ros.startTime();
	}
	$scope.endTime   = ros.endTime;
	$scope.regeneratePlan = ros.regeneratePlan;
	$scope.time_elapsed = "0:00";
	$scope.current_task = "None";
	var formatTime = function(milliseconds){
		  var minutes = Math.round((milliseconds / 1000)/  60)
			return minutes.toString() + ":" + ((milliseconds - (minutes * 60 *1000))/1000).toString()
	}
	var update = function(){
		$scope.time_elapsed = formatTime(Date.now() - $scope.start);
		window.requestAnimationFrame(update);
	}
	update();
 //TODO add interval-based update of current task 
}]);
