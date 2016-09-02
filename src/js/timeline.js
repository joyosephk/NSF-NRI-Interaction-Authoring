angular_app.controller('timelineController',['$scope','utils',function($scope ,utils){
	var chart;
	$scope.init = function(){
			if(utils.chartsLoaded()){
			var container = document.getElementById('timeline');
			chart = new google.visualization.Timeline(container);		
			drawChart()
			}else{
				console.log("charts not yet loaded")
				utils.onChartsLoaded(function(){
					$scope.init();
				})
			}
	}
	function drawChart() {
			var humanData, robotData; 
			if(utils.test){
					humanData = testDataFactory("  Human");
					robotData = testDataFactory("Robot");
			}
			var dataTable = new google.visualization.DataTable();
			dataTable.addColumn({ type: 'string', id: 'Position' });
			dataTable.addColumn({ type: 'string', id: 'Name' });
			dataTable.addColumn({ type: 'date', id: 'Start' });
			dataTable.addColumn({ type: 'date', id: 'End' });
			dataTable.addRows(humanData.concat( robotData) );
			// Draw the timeline!
			chart.draw(dataTable);
	}
	var testDataFactory = function(type){
		var arr = [];
		for (i = 0; i <= 10; i++){
			arr.push([type, i.toString(), new Date(2016, 3,30, 2, i), new Date(2016,3,30,2,i,10+Math.round(50*Math.random()))]);
		}
		return arr;
	}
	$scope.init();
}]);
