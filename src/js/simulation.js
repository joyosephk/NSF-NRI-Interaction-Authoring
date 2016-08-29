angular_app.factory('simulation', ["models","$http",'ros','utils3D','utils',function(models, $http, ros,utils3D, utils){
	var scene = new THREE.Scene();
	scene.up = new THREE.Vector3(0,1,0);
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.up = new THREE.Vector3(0 ,-1,0);
	camera.position.z = 5;
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	var gridHelper = new THREE.GridHelper(100,100);
	var insertionPoint = document.getElementById('rosPoint');
	insertionPoint.appendChild(renderer.domElement);
	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableZoom = true;
	var environment_objects = [];
	var interactive_objects = [];
	var url = utils.url;
	var loader = new THREE.ObjectLoader();
	//done for debugging purposes
	var boundingRadius = 1;
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	var sphereGeom = new THREE.SphereGeometry(.08,60,60);
	var material = new THREE.MeshBasicMaterial( {color: 0x0f5f00} );
	var sphere = new THREE.Mesh(sphereGeom,material);
	//mark the sphere as the end effector, makes it easier to spot in searches
	sphere.endEffector = true;
	var currentPath = [];
	var previewMaterial = new THREE.MeshBasicMaterial( {color: 0x1fdfc03} );
	var lineMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});

	var warning = function(){
		console.warn("running in test mode, most ROS functions won't work");
	}
	if (!url){
		warning();
	}
	var addFunction = function(func){
		return url ? func: warning;
	}
	//websocket connection to ROS
	var ros = new ROSLIB.Ros({
		url: url
	});
	
	
	window.scene = scene;
	
	//the following is all the code for the end effector display
	
	//add the end effector to the scene
	scene.add(sphere);
	scene.add(gridHelper);
	//gets data of arm positions, used to display end effector
	var incoming = new ROSLIB.Topic({
		ros: ros, 
		name: '/joint_position_inbox',
		mesageType: 'geometry_msgs/Pose'
	});
	//behavior for when the client receives new data for the arm position
	incoming.subscribe(function(data){
	  vec = data.position
		moveObject(sphere,new THREE.Vector3(vec.x, vec.y,vec.z));
	});
	
	
	var isInBoundingSphere = function(vec){
		//calculate the bounding sphere of the arms motion
		return vec.length() <= boundingRadius
	}

	var  onMouseMove = function( event ) {
			// calculate mouse position in normalized device coordinates
			// 	// (-1 to +1) for both components
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;		
			raycaster.set(mouse, camera);
			var intersects = raycaster.intersectObjects(scene.children);
			for(i in intersects){
				if(intersects[i].endEffector){
					console.log("you're on the end effector!");
				}
			}
	}
	document.addEventListener('mousemove', onMouseMove);


	/**
	 * move an object in 3D space
	 *@param{THREE.Object3D} object, the object to move
	 *@param{THREE.Vector3} vec, the 3D position to move to
	*/
	var moveObject = function(object,vec){
		var pos = object.position;
		var end = vec.sub(pos);
		var mat = new THREE.Matrix4();
		mat.makeTranslation(end.x, end.y, end.z);
		object.applyMatrix(object.matrix.multiply(mat));
	}
	/**
	 * rotate an object
	 *@param{THREE.Object3D} object, the object to rotate
	 *@param{THREE.Vector3} vec, the radians of rotation along each axis
	*/
	var rotateObject = function(object,vec ){
		object.rotateX(vec.x);
		object.rotateY(vec.y);
		object.rotateZ(vec.z);
		object.updateMatrix();
	}
		
	/**
	 * Add an object to the space
	 * @param{enum} type - interactive or envirmonental objects
	 * @param{THREE.Object3D} object - the 3D model of the object
	 * @param{THREE.Vector3} pos - the position to add the object at
	 * */
	var addObject = function(type, object, pos){
		loader.load(models.get_model_path(object),function(object){
			console.log(object);
			moveObject(object,pos); 
			scene.add(object);
			object.tag = true;
		});
	}
/**
 * Get all of the objects the user (or the program) has added, leaves out things like lighting that ROS3D generates
 * @return{array} an array of THREE.Object3D objects
 */
	var getObjects = function(){
		return scene.children.filter(function(el){
			if(el.tag){
				return true;
			}
			return false;
		});
	}
	/**
	 *not yet implemented
	 */
	var getObject = function(){}
/**
 * Change the color of a given object
 * @param{THREE.Object3D} object - the object to change the color of
 * @param{boolean} undo - flag to revert to the previous color
 */
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
/**
 * change the scale of a given object relative to its current size
 * @param{THREE.Object3D} object -  the object to rescale
 * @param{number} scale - the scale to make the object, relative to the current scale 
 */
	var scaleObject = function(object, scale){
		mat = new THREE.Matrix4();
		mat.makeScale(scale,scale,scale);
		object.applyMatrix(mat);
	}

	/**
	 * preview a single  point in space
	 * @param{Vector3} vec - the position to preview
	 */
	var previewPoint = function(vec){
		cleanNodes();
		//TODO remove old spheres
		var previewSphere = new THREE.Mesh(sphereGeom, previewMaterial) 
		previewSphere.preview = true;
		vec = new THREE.Vector3(vec.x,vec.y,vec.z);
		moveObject(previewSphere,vec);
		scene.add(previewSphere);
	}
/**
 * preview a path of motions
 * @param{array} arr - an array of positional data
 */
	var previewPath = function(arr){
		var next;
		var geom = new THREE.Geometry();
		cleanNodes();
		for(i=0; i < arr.length; i++){
			if( !(arr[i] instanceof Object) )continue;
			//add node
			var vec = arr[i].position;
			if(arr[i+1]){
				next = arr[i+1].position;
			}
			var sphere = new THREE.Mesh(sphereGeom, previewMaterial)
			scene.add(sphere);
			moveObject(sphere, makeTHREEVector(vec))
			//draw line from one node to the next
			if(next){
				//create the line
				geom.vertices.push(makeTHREEVector(vec))
			}
			var line = new THREE.Line(geom, lineMaterial);
			scene.add(line) ;
		}
	}

	//removes all nodes marked as previews
	var cleanNodes = function(){
		scene.traverse(function(object){
			if(object.preview){
				scene.remove(object);	
			}		
		});	
	}
	var makeTHREEVector = function(vec){
		return new THREE.Vector3(vec.x, vec.y, vec.z);
	}
	var render = function(){
		requestAnimationFrame( render );
		renderer.render(scene, camera);
	}
	render();
	return{
		addObject: addFunction(addObject),
		getObjects: addFunction(getObjects),
		getObject: addFunction(getObject),
		moveObject: addFunction(moveObject),
		changeColor: addFunction(changeColor),
		rotateObject: addFunction(rotateObject),
		scaleObject: addFunction(scaleObject),
		previewPoint: addFunction(previewPoint),
		previewPath: addFunction(previewPath)
	 }
}]);
