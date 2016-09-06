angular_app.controller('timelineViewController', ['$scope','utils', 'ros',function($scope,utils,ros ){

	$scope.regeneratePlan = ros.regeneratePlan;

}]);
