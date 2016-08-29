angular_app.controller('timelineController',['utils',function(utils,$scope){
	var container = document.getElementById('timeline');
	var chart;
	console.log("in controller scope");
	google.charts.load("current", {packages:["timeline"]});
	google.charts.setOnLoadCallback(initChart);
	function initChart(){
		console.log("charts loaded");
		chart = new google.visualization.Timeline(container);		
		drawChart()
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
}]);
