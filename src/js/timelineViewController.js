angular_app.controller('timelineViewController', ['$scope','utils', 'ros',function($scope,utils,ros ){
	$scope.startTime = ros.startTime;
	$scope.endTime   = ros.endTime;
	$scope.regeneratePlan = ros.regeneratePlan;

}]);
