var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var scss = require('gulp-scss');

gulp.task('concat-minify',function(){
			gulp.src(['js/bower_components/eventemitter2/lib/eventemitter2.js',
			'js/bower_components/three.js/build/three.js',
			'js/bower_components/roslib/build/roslib.js',
			'js/bower_components/angular/angular.js',
			'js/*.js'])
   				 .pipe(uglify())
					 .pipe(concat('index.js'))
					 .pipe(gulp.dest('./static/build'));
});
gulp.task('sass2css',function(){
	gulp.src("styles/**/*.scss")
	.pipe(scss())
	.pipe(gulp.dest('./static'))
});

gulp.task('default',function(){
	console.log("beginning watch....");
	gulp.watch('js/*.js',['concat']);
	gulp.watch('styles/*.scss', ['sass2css']);
});
gulp.task('concat',function(){
			gulp.src(['js/bower_components/eventemitter2/lib/eventemitter2.js',
			'js/bower_components/three.js/build/three.js',
			'js/bower_components/roslib/build/roslib.js',
			'js/bower_components/angular/angular.js',
			'bower_components/angular-route/angular-route.js',
			'js/*.js'
			])
					 .pipe(concat('index.js'))
					 .pipe(gulp.dest('./static/build'));
});


