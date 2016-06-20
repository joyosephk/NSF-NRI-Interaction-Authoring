var app = (function(){
	var zeroVec = new THREE.Vector3(0,0,0);
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
	var cube = new THREE.Mesh( geometry, material );
	//cube.translate(1,1,1);
	cube.boundingSphere = 1;
	var axisHelper = new THREE.AxisHelper(20);
	var tableGeom = new THREE.BoxGeometry(2,1,20);
	var tableMat = new THREE.MeshStandardMaterial({color:0xFFFFFF});
	var table = new THREE.Mesh(tableGeom, tableMat);
	table.isSurface = true;
	table.position.z = 15;
	scene.add(table);
	//scene.add(axisHelper);
	scene.add(cube);
	camera.position.z = 15;
	camera.position.y = 15;
	camera.lookAt(zeroVec);
	var light = new THREE.HemisphereLight( 0xffffbb, 0x333333, 1 );
	light.position.set( 50, 50, 50 );
	scene.add( light );
	var raycaster = new THREE.Raycaster();
	
	var moveCopy = function(pos){
		console.log(selected_object);
		
		selected_object.position.x = pos.x;
		selected_object.position.y = pos.y+(selected_object.scale.y *.5);
		selected_object.position.z = pos.z;
	}

	var mouse = new THREE.Vector2(0,0);
	var mouseEvent = function(event){
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;		
		if(selected_object){
			var intersection = findSelection();
			if(intersection){
				var pos = intersection.point
				moveCopy(pos);
			}
		}
		
	}
	var makeCopy = function(event){
		var placement = new THREE.Vector2();
		placement.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		placement.y =  - ( event.clientY / window.innerHeight ) * 2 + 1;
		copy = selected_object.clone();
		copy.lock = true;
		copy.material.color =  new THREE.Color(.5,1,1);
		copy.position.x = placement.x;
		copy.position.y= placement.y;
		copy.material.color = new THREE.Color(1,0,0);
		scene.add(copy);
		selected_object = copy;
	}
	var placeCopy = function(event){
		//makeDiv(event, 2);
		selected_object = null;
	}
	var makeDiv = function(event, stepNum){
		var div = document.createElement('div');
		div.style.position = 'absolute';
		div.style.color = '#FFF';
		div.innerHTML = stepNum + '';
		div.style.top = event.clientY + 'px';
		div.style.left = event.clientX +'px';
		document.body.appendChild(div);

	}
	var selected_object = null;
	document.addEventListener( 'mousemove', mouseEvent, false );
	var clickHandler = function(event){
		if(selected_object){
			placeCopy(event);
			//need to place object
			return;
		}
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;		
		findIntersect(function(object){
			object.material.color = new THREE.Color(1,1,1);
			object.lock = true;
			makeDiv(event, 1);
			selected_object = object;
			makeCopy(event);
		});
	}
	
	
	document.addEventListener('click', clickHandler,true);
	var findIntersect = function(operation){
		raycaster.setFromCamera(mouse,camera);
		var intersects = raycaster.intersectObjects( scene.children );
		if (intersects.length > 0){
			for(i in intersects){
				if(!intersects[i].object.lock){
					operation(intersects[i].object);
				}
			}
		}	
			
	}
	var findSelection = function(){
		raycaster.setFromCamera(mouse,camera);
		var intersects = raycaster.intersectObjects(scene.children);
		if(intersects.length > 0){
			console.log(intersects);
			return intersects[intersects.length -1];
		}else{
			return null;
		}
	}


	var cameraTheta = 0;
 	var cameraRadius = 15;
	var keyDownHandler = function(event){
		key = event.code;
		console.log(event.code)
		switch(key){
			case 'ArrowLeft':
				cameraTheta += .14;
				break;
			case 'ArrowRight':
				cameraTheta += -.14;
				break;

			case 'ArrowUp':
				cameraPhi += .14;
				break;
			case 'ArrowDown':
				cameraPhi += -.14;
				break;
		}
		camera.position.x = Math.cos(cameraTheta)*cameraRadius*Math.cos(0);
		camera.position.z = Math.sin(cameraTheta)*cameraRadius*Math.sin(Math.PI/2);
	//	camera.position.z = Math.cos(cameraTheta)*cameraRadius;	
		camera.lookAt(zeroVec);
	}
	document.addEventListener('keydown',keyDownHandler,false);
	//render loop
	function render() {
		if(!cube.lock){
			cube.material.color = new THREE.Color(0,0,1);
		}
		//call all relevant animation code here
		findIntersect(function(object){
			object.material.color.set(0xff00ff);
		});
		requestAnimationFrame( render );
		renderer.render( scene, camera );
	}
	render();	
})();
