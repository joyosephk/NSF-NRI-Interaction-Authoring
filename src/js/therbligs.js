angular_app.factory('therbligs', [function(){
 var theribligFactory =  function(el){
	switch (el.type){
		//switch graspVal based on therbligs
		case "grasp":
			el.graspVal = 85;
			break;
		case "move":
			el.graspVal = 0;
			break;
		case "moveObject":
			el.graspVal = 85;
			break;
		case "release":
			el.graspVal = 0;
			break;
	}
	 return{
				id : el.id,
				graspVal: el.graspVal,
				name: el.name,
				position: el.position
			}
 }
}]);
