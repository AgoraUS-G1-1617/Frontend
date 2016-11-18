var agoraUSApp = angular.module('AgoraUS', [ 'ngRoute', 'AgoraUSControllers' ]);

agoraUSApp.config([ '$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$routeProvider.
			when('/',{
				templateUrl:'views/main/main.html',
				controller:'MainViewController'
			}).//Ver una unica encuesta
			when('/resultados/encuestas/ver.do',{
				templateUrl : 'views/visualizacion/encuestaGrafica.html',
				controller : 'visualizacionController',
			}).
			when('/resultados/mapa.do', {
				templateUrl : 'views/visualizacion/resumenGrafica.html',
				controller : 'mapaController'
			}).
			when('/resultados/preguntas/estadistica.do', {
				templateUrl : 'views/visualizacion/resumenPreguntas.html',
				controller : 'preguntasController'
			}).
			when('/resultados/encuestas.do', {
				templateUrl : 'views/visualizacion/encuesta.html',
				controller : 'VisualizacionRestController'
			}).
			when('/resultados/encuestas.do?encuesta=:encuesta',{
				templateUrl : 'views/visualizacion/encuesta.html',
				controller : 'visualizacionRestController',
			}).//Errores
			when('/error.do',{
				templateUrl: 'views/main/error.html',
				controller: 'ErrorController'
			}).
			when('/index',{
				redirectTo : '/'
			})./* Aqui van mas configuraciones de ruta */
			otherwise({
				redirectTo : '/error.do'
			});

			// configure html5 to get links working on jsfiddle
			$locationProvider.html5Mode(true);
		} ]);