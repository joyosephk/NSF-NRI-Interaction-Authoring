var app = (function(){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add(cube);
	camera.position.z = 15;
	camera.position.y = 5;
	cube.rotation.x = .3;
	cube.rotation.y = .4;
	var light = new THREE.PointLight( 0xff0000, 1, 100 );
	light.position.set( 50, 50, 50 );
	scene.add( light );
	var raycaster = new THREE.Raycaster();
	var moveCopy = function(vec2){
		var vector = new THREE.Vector3();
		vector.set(mouse.x, mouse.y, 1);
		vector.unproject(camera);
		var direction = vector.sub(camera.position).normalize();
		var distance = camera.position.z/ direction.z;
		var pos = camera.position.clone().add(direction.multiplyScalar(distance));
		selected_object.position.x = - pos.x;
		selected_object.position.y = - pos.y +10;
	}
	var mouse = new THREE.Vector2(0,0);
	var mouseEvent = function(event){
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;		
		if(selected_object){
			moveCopy(mouse);
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
		makeDiv(event, 2);
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
	//render loop
	function render() {
		if(!cube.lock){
			cube.material.color = new THREE.Color(0,0,1);
		}
		//call all relevant animation code here
		findIntersect(function(object){
			object.material.color = new THREE.Color(1,0,1);
		});
		requestAnimationFrame( render );
		renderer.render( scene, camera );
	}
	render();	
})();
