var angular_app = angular.module('nriApp',['ngRoute']);
 
angular_app.config(function($routeProvider, $locationProvider){
  $routeProvider
		.when('/',{
			templateUrl: 'static/templates/index.html',
			controller: 'mainController'
		})
	  .when('/timeline',{
	 	templateUrl: 'static/templates/timeline.html' ,
		controller: 'timelineViewController'
	 })
	.otherwise({
		redirectTo: '/'		
	});
	 //$locationProvider.html5Mode(true);
});
//let's avoid the default 'a' click event
	/*var anchor = document.querySelector("a");*/
	//console.log("adding click even t")
 //anchor.addEventListener('click',function(event){
		//debugger;
		//event.preventdefaults();

	/*});*/

