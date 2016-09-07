angular_app.controller('timelineController',['$scope','utils','ros',function($scope ,utils, ros){
	var chart;
	$scope.init = function(){
			if(utils.chartsLoaded()){
				console.log("executing chart initialization")
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
	var getData = function(callback){
			console.log("getting chart data")
			var humanData, robotData; 
				if(false){
						humanData = testDataFactory("  Human");
						robotData = testDataFactory("Robot");
				}else{
					ros.getPlans().success(function(data){
						humanData = [];
						for(i in data["human"]){
							el = data["human"][i]
							console.log(el)
							humanData.push(["human", el["action"],new Date(2016, 3,30, 2, parseFloat(el["start"])),new Date(2016, 3, 30, 2, parseFloat(el["start"])+parseFloat(el["duration"]))]);
							humanData.push(["human-resource", el["object"],new Date(2016, 3,30, 2, parseFloat(el["start"])),new Date(2016, 3, 30, 2, parseFloat(el["start"])+parseFloat(el["duration"]))]);

						}
						for(i in data["robot"]){
							el = data["robot"][i]
							humanData.push(["robot", el["action"], new Date(2016, 3,30, 2, parseFloat(el["start"])),new Date(2016, 3, 30, 2, parseFloat(el["start"])+parseFloat(el["duration"]))]);
							humanData.push(["robot-resource", el["object"],new Date(2016, 3,30, 2, parseFloat(el["start"])),new Date(2016, 3, 30, 2, parseFloat(el["start"])+parseFloat(el["duration"]))]);
						}		
						console.log(humanData)
						data = humanData
						callback(data);
					})
				}
	}
	function drawChart() {
		getData(function(data){	
			var dataTable = new google.visualization.DataTable();
			dataTable.addColumn({ type: 'string', id: 'Position' });
			dataTable.addColumn({ type: 'string', id: 'Name' });
			dataTable.addColumn({ type: 'date', id: 'Start' });
			dataTable.addColumn({ type: 'date', id: 'End' });
			
			dataTable.addRows(data );
			// Draw the timeline!
			chart.draw(dataTable, {
				avoidOverlappingGridLines: false,
				height: window.height/2

			});
		});
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
