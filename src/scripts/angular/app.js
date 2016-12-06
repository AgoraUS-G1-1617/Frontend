var agoraUSApp = angular.module('AgoraUS', [ 'ngRoute', 'AgoraUSControllers' ,'pascalprecht.translate']);

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

//Configuracion del i18n. Aquí van todos los textos
    agoraUSApp.config(['$translateProvider', function ($translateProvider) {
      $translateProvider.translations('en', {
        'ENCUESTAS':'SURVEYS',
    'VerResultados':'See survey results',
    'VerEstadisticas':'See statistics',
    'VerMapa':'See map',
		'error':'We are sorry, an error occured or the page does not exist.',
		'backToMain':'Back to main page',
        BUTTON_LANG_ES: 'Spanish',
        BUTTON_LANG_EN: 'English'
      });

      $translateProvider.translations('es', {
        'ENCUESTAS':'ENCUESTAS',
        'VerResultados':'Ver resultados votaciones',
        'VerEstadisticas':'Ver estadísticas',
        'VerMapa':'Ver mapa',
				'error':'Lo sentimos, se ha producido un error al intentar acceder a la página, o la página no existe.',
				'backToMain':'Volver al inicio',
        BUTTON_LANG_ES: 'Español',
        BUTTON_LANG_EN: 'Inglés'
      });

      $translateProvider.preferredLanguage('es');
    }]);
