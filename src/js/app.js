angular_app.factory('simulation', ["models","$http",function(models, $http){
	var environment_objects = [];
	var interactive_objects = [];
	var url = "ws://demo.robotwebtools.org:9090"; 
  var ros = new ROSLIB.Ros({
		url: url
	});
	var incoming = new ROSLIB.Topic({
		ros: ros, 
		name: '/joint_position_inbox',
		mesageType: 'geometry_msgs/Pose'
	});
	var rec;
	
	var outgoing = new ROSLIB.Topic({
		ros: ros,
		name: 'joint_position_remote',
		messageType:'geometry_msgs/Pose'
	});
	outgoing.advertise();
	var viewer = new ROS3D.Viewer({
		divID:'rosPoint',
		width: window.innerWidth,
		height: window.innerHeight,
		background:'#002232',
		antialias: true
	});
	

	window.viewer = viewer;
	
	var tf = new ROSLIB.TFClient({
		ros: ros,
		angularThres : 0.01,
		transThres : 0.01,
		rate : 10.0
	});
	
	var geom = new THREE.SphereGeometry(.2,60,60);
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	var sphere = new THREE.Mesh(geom,material);
	//mark the sphere as the end effector
	sphere.endEffector = true;
	viewer.addObject(sphere,true);
		
	
	window.wireframe = function(obj){
		obj.traverse(function(object){
			if(object.material){
				object.material.wireframe = true;
			
			}
		});
	}
	var boundingRadius = 1;
	var isInBoundingSphere = function(vec){
		//calculate the bounding sphere of the arms motion
		return vec.length() <= boundingRadius
	}

//	urdf.change(function(e){
	//	console.log(e)	
//	});
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	var  onMouseMove = function( event ) {
			// calculate mouse position in normalized device coordinates
			// 	// (-1 to +1) for both components
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;		
			raycaster.set(mouse, viewer.camera);
			var intersects = raycaster.intersectObjects(viewer.scene.children);
			for(i in intersects){
				if(intersects[i].endEffector){
					console.log("you're on the end effector!");
				}
			}
	}
	var rec;
	document.addEventListener('mousemove', onMouseMove);
	incoming.subscribe(function(data){
		if(!rec){
			rec = data;
			console.log(rec);
		}
		vec = data.position
		 moveObject(sphere,new THREE.Vector3(vec.x, vec.y,vec.z));
	});

	var loader = new THREE.ObjectLoader();
	var moveObject = function(object,vec){
		//TODO right now this just move by distances
		//it should just do final coordinates
		var pos = object.position;
		var end = vec.sub(pos);
		var mat = new THREE.Matrix4();
		mat.makeTranslation(end.x, end.y, end.z);
		object.applyMatrix(object.matrix.multiply(mat));
	}
	var rotateObject = function(object,vec ){
		object.rotateX(vec.x);
		object.rotateY(vec.y);
		object.rotateZ(vec.z);
		object.updateMatrix();
	}

	viewer.addObject(new ROS3D.Grid({
				color:0x3000ff,
				cellSize: 0.5,
				size: 300

	}));
	var addObject = function(type, object, pos){
		loader.load(models.get_model_path(object),function(object){
			console.log(object);
			moveObject(object,pos); 
			viewer.addObject(object);
			object.tag = true;
		});
	
	}
	var getObject = function(){

	}
	var getObjects = function(){
		return viewer.scene.children.filter(function(el){
			if(el.tag){
				return true;
			}
			return false;
		});
	
	}
	var changeColor = function(object, undo){
		object.traverse(function(obj, undo){
			if(obj.material){
				if(undo){
			//		obj.material.color = obj.undoColor;
				}else{
					//TODO this is changing the color of lights too, fix it
				//	obj.undoColor = obj.material.color;
					//obj.material.color = 0xFFFFFF;
				}
			}
		});
	}
	var scaleObject = function(object, scale){
		mat = new THREE.Matrix4();
		mat.makeScale(scale,scale,scale);
		object.applyMatrix(mat);

	}
	var moveArm = function(vec){
		outgoing.publish(new ROSLIB.Message({
			position:	new ROSLIB.Vector3(0.2117910853402465,-0.26117743992187786,0.47370996918522384), 
			orientation:	new ROSLIB.Quaternion( 0.39724309036810795,0.3709431717747427,-0.6039290090423478,0.47370996918522384)
		}));
	}
	//array of objects
	var positions = [];
	var nodeData = new ROSLIB.Topic({
		ros:ros,
		name:'nodedata',
		messageType:'wpi_jaco_msgs/ArmNode'
	});
	nodeData.advertise();
	var savePos = function(name , id){
		console.log("sending message");
		vec = sphere.position
		nodeData.publish(new ROSLIB.Message({
					name: name,
					ID: id,
					pose:{
						position:{
							x: vec.x,
							y: vec.y,
							z:vec.z
						}
					}
		}	
					));	
	}
	var getPositions = function(){}


	return{
		addObject: addObject,
		getObjects: getObjects,
		getObject: getObject,
		moveObject: moveObject,
		changeColor: changeColor,
		rotateObject: rotateObject,
		scaleObject: scaleObject,
		moveArm: moveArm,
		savePos:savePos,
		getPositions: getPositions

	}
}]);
