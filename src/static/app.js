var url = "ws://localhost:9090";
var ros = new ROSLIB.Ros({
	url: url
});
var topic = new ROSLIB.Topic({
	ros: ros,
	name:'/test'
});
topic.subscribe(function(message){
	console.log(message);
});
var viewer = new ROS3D.Viewer({
	divID:'rosPoint',
	width: window.innerWidth,
	height: window.innerHeight,
	antialias: true,
	intensity: 0.1
});
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var  onMouseMove = function( event ) {
		// calculate mouse position in normalized device coordinates
		// 	// (-1 to +1) for both components
		//
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;		
}
document.addEventListener('mousemove', onMouseMove);
var mat = new THREE.MeshPhongMaterial({
	color: 0x2491ce,
	wireframe: true,
	wireframeLinewidth: 10,
	emissiveIntensity: .05,
	emissive: 0x00ff00
});

var geom = new THREE.SphereGeometry(1, 10,10);
var mesh = new THREE.Mesh(geom,mat);
var loader = new THREE.ObjectLoader();
var table = null;
loader.load('static/models/table/table.json', 
		function(object){
			var mat = new THREE.Matrix4();
			mat.makeScale(1.25,1.15,1);
			//mat.rotateX(Math.PI/2)
			table = object;
			table.applyMatrix(table.matrix.multiply(mat));
			//table.rotateX(Math.PI/2);
			viewer.addObject( object, true );	
		});

var moveObject = function(object,x,y,z){
	//TODO right now this just move by distances
	//it should just do final coordinates
	var mat = new THREE.Matrix4();
	mat.makeTranslation(x,y,z);
	object.applyMatrix(object.matrix.multiply(mat));
}
moveObject(mesh, 4,1 ,3);

viewer.scene.add(mesh);
viewer.addObject(new ROS3D.Grid({
      color:0x3000ff,
      cellSize: 0.5,
      size: 300
    }));


