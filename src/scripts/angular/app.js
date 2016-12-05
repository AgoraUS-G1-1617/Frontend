var agoraUSApp = angular.module('AgoraUS', [ 'ngRoute', 'AgoraUSControllers' ]);

agoraUSApp.config([ '$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$routeProvider.
			when('/',{
				templateUrl:'views/main/main.html',
				controller:'MainViewController'
			}).//Ver una unica encuesta
			when('/resultados/encuestas/ver',{
				templateUrl : 'views/visualizacion/encuestaGrafica.html',
				controller : 'visualizacionController',
			}).
			when('/resultados/mapa', {
				templateUrl : 'views/visualizacion/resumenGrafica.html',
				controller : 'mapaController'
			}).
			when('/resultados/encuestas/estadistica', {
				templateUrl : 'views/visualizacion/resumenPreguntas.html',
				controller : 'preguntasController'
			}).
			when('/resultados/encuestas', {
				templateUrl : 'views/visualizacion/encuesta.html',
				controller : 'VisualizacionRestController'
			}).//Errores
			when('/error',{
				templateUrl: 'views/main/error.html',
				controller: 'ErrorController'
			}).
			when('/index',{
				redirectTo : '/'
			})./* Aqui van mas configuraciones de ruta */
			otherwise({
				redirectTo : '/error'
			});

			// configure html5 to get links working on jsfiddle
			$locationProvider.html5Mode(true);
		} ]);
