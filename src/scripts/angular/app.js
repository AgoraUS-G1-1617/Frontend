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
        BUTTON_LANG_EN: 'English',
				'Main1':'A new way to',
				'Main2':'Take decisions in group',
				'Main3':'Agora@US is an open source system for secure online surveys where hundreds or thousands of people can participate in: '+
				'polls,ballots,elections,referendums. We provide professional solutions for democratic innovation.',
				'Main4':'Results in this subsystem can be displayed in many different graphics, with different styles.',
				'Main5':'Lots of published surveys can be requested and seen in a simple way.',
				'Nombre':'Name',
				'Resultados':'See results',
				'Preguntas':'Questions',
				'VerGrafica':'See graphics',
				'Circular':'Circle',
				'Columnas':'Columns',
				'Semicirculo':'Semicircle',
				'Circulo3D':'3D Circle',
				'FrecuenciaEncuestas':'Survey density by cities',
				'EncuestaMasVotada':'Most popular survey/s:',
      });

      $translateProvider.translations('es', {
        'ENCUESTAS':'ENCUESTAS',
        'VerResultados':'Ver resultados votaciones',
        'VerEstadisticas':'Ver estadísticas',
        'VerMapa':'Ver mapa',
				'error':'Lo sentimos, se ha producido un error al intentar acceder a la página, o la página no existe.',
				'backToMain':'Volver al inicio',
        BUTTON_LANG_ES: 'Español',
        BUTTON_LANG_EN: 'Inglés',
				'Main1':'Una nueva forma de',
				'Main2':'Tomar decisiones en grupo',
				'Main3':'Agora@US es un sistema software libre ideal para votaciones '+
					'seguras online donde participan cientos o miles de personas: '+
					'primarias abiertas, elecciones institucionales, consultas ciudadanas, '+
					'referéndums. Proveemos soluciones profesionales de innovación	democrática.',
				'Main4':'Los resultados de este subsistema se muestran de diferentes formas en gráficos de diferentes estilos.',
				'Main5':'Se pueden consultar muchas encuestas publicadas en el sistema y visualizar los datos de una manera sencilla.',
				'Nombre':'Nombre',
				'Resultados':'Ver resultados',
				'Preguntas':'Preguntas',
				'VerGrafica':'Ver gráfica',
				'Circular':'Circular',
				'Columnas':'Columnas',
				'Semicirculo':'Semicírculo',
				'Circulo3D':'Circulo 3D',
				'FrecuenciaEncuestas':'Frecuencia de encuestas por ciudad',
				'EncuestaMasVotada':'Encuesta/s con mayor cantidad de votos:',
      });

      $translateProvider.preferredLanguage('es');
    }]);
