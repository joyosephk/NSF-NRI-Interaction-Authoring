angular_app.factory('3DUtils',[function(){
	


	var createLabel = function(message){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = '#FFF';
		ctx.fillText(message);
		var texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;
		var spriteMaterial = new THREE.SpriteMaterial({map: texture});
		var label = new THREE.Sprite(spriteMaterial);
		return label;
	
	}

	return{
		createLabel: createLabel
	}

}]);
