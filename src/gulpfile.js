var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');

var done = function(){
	console.log('done')
}
gulp.task('default',function(){
	pump([
			gulp.src('static/bower_components/three.js/build/three.js'),
			gulp.src('static/bower_components/angular/angular.min.js'),
			gulp.src('static/bower_components/eventemitter2/lib/eventemitter2.js'),
			gulp.src('static/collada.js'),
			gulp.src('static/collada2.js'),
			gulp.src('static/stl.js'),
			gulp.src('static/bower_components/ros3d/build/ros3d.js'),
			gulp.src('static/*.js'),
			uglify(), 
			gulp.dest('static/build')			
			],
			done);
});
