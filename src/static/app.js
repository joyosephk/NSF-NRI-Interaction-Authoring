angular_app.factory('simulation', ["models",function(models){
	var environment_objects = [];
	var interactive_objects = [];
	var url = "ws://localhost:9090";
	var ros = new ROSLIB.Ros({
		url: url
	});
	var viewer = new ROS3D.Viewer({
		divID:'rosPoint',
		width: window.innerWidth,
		height: window.innerHeight,
		antialias: true,
		intensity: 0.1
	});
	var tf = new ROSLIB.TFClient({
		ros: ros,
		angularThres : 0.01,
		transThres : 0.01,
		rate : 10.0,
		fixedFrame: '/tf_static'
		
	});
	var urdf = new ROS3D.UrdfClient({
		ros: ros,
		tfClient: tf,
		path: '/static/',
		rootObject: viewer.scene,
		loader: ROS3D.COLLADA_LOADER_2
	});
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	var  onMouseMove = function( event ) {
			// calculate mouse position in normalized device coordinates
			// 	// (-1 to +1) for both components
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;		
	}
	//document.addEventListener('mousemove', onMouseMove);
	var mat = new THREE.MeshPhongMaterial({
		color: 0x2491ce,
		wireframe: true,
		wireframeLinewidth: 10,
		emissiveIntensity: .05,
		emissive: 0x00ff00
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
					obj.material.color = obj.undoColor;
				}else{
					//TODO this is changing the color of lights too, fix it
					obj.undoColor = obj.material.color;
					obj.material.color = 0xFFFFFF;
				}
			}
		});
	}
	var scaleObject = function(object, scale){
		mat = new THREE.Matrix4();
		mat.makeScale(scale,scale,scale);
		object.applyMatrix(mat);

	}

	return{
		addObject: addObject,
		getObjects: getObjects,
		getObject: getObject,
		moveObject: moveObject,
		changeColor: changeColor,
		rotateObject: rotateObject,
		scaleObject: scaleObject
	}
}]);
