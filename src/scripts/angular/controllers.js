var agoraUSControllers = angular.module('AgoraUSControllers', [ 'ngRoute' ]);

var host = "http://localhost:3000/"

function showHeaderAndFooter($scope, title) {
	// Esta funci�n hay que llamarla en todos los controladores para que
	// muestren el t�tulo, header y footer
	$scope.date = new Date();
	$scope.title = title;
	$scope.footer = {
		name : "footer.html",
		url : "views/main/footer.html"
	};
	$scope.header = {
		name : "header.html",
		url : "views/main/header.html"
	};
}
// Header y Footer
agoraUSControllers.controller('MainController', [ '$scope', '$route',
		'$routeParams', '$location',
		function($scope, $route, $routeParams, $location) {
			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;
			showHeaderAndFooter($scope, null);
			$scope.dataHasLoaded=true;//Hay que ponerlo al final para que angular cargue la vista despues de la ejecucion del controlador
		} ]);

// Muestra una pantalla de error
agoraUSControllers.controller('ErrorController', [ '$scope', '$routeParams',
		function($scope, $routeParams) {
			showHeaderAndFooter($scope, "Error");
			$scope.params = $routeParams;
			$scope.dataHasLoaded=true;
		} ]);

// Vista por defecto en index.html
agoraUSControllers.controller('MainViewController', [ '$scope', '$routeParams',
		function($scope, $routeParams) {
		$scope.dataHasLoaded=true;
		showHeaderAndFooter($scope, "Inicio");
			$scope.params = $routeParams;
		} ]);


//Vista de encuesta visualizacion controller
agoraUSControllers.controller('visualizacionController', ['$http','$scope', '$routeParams','$window',
		function($http,$scope, $routeParams,$window) {
		//$scope.dataHasLoaded=false;
		showHeaderAndFooter($scope, "Inicio");


			$scope.params=$routeParams;
			$http.get("/api/resultados/encuestas?encuesta="+$routeParams.encuesta).then(function successCallback(response) {
				try {
					console.log("Cargado");
					$scope.recuento = response['data'][0];
					console.log($scope.recuento);
					$http.get("/api/resultados/preguntas?encuesta="+$routeParams.encuesta).then(function successCallback(datos) {
						$scope.preguntas=datos['data'];
						console.log($scope.preguntas);
				});
					showHeaderAndFooter($scope, "Encuestas");
					$scope.dataHasLoaded=true;
				} catch (err) {
					console.log("here");
					$window.location.href = "/error";
				}
			}, function errorCallback(response) {
				alert('Error obteniendo el objeto JSON');
			});


		} ]);

//controller del mapa

agoraUSControllers.controller('mapaController', ['$http','$scope', '$routeParams',
		function($http,$scope, $routeParams) {
		//$scope.dataHasLoaded=false;
		showHeaderAndFooter($scope, "Inicio");



		} ]);




//controller de estadisticas

agoraUSControllers.controller('preguntasController', ['$http','$scope', '$routeParams','$window',
		function($http,$scope, $routeParams,$window) {
		//$scope.dataHasLoaded=false;
		showHeaderAndFooter($scope, "Inicio");


			$scope.params=$routeParams;
			$http.get(host+"api/resultados/preguntas/votadas").then(function successCallback(response) {
				try {
					console.log("Cargado");
					$scope.prMasVotadas = response['data'];
					console.log($scope.prMasVotadas);

					showHeaderAndFooter($scope, "Encuestas");
					$scope.dataHasLoaded=true;
				} catch (err) {
					$window.location.href = "/error";
				}
			}, function errorCallback(response) {
				alert('Error obteniendo el objeto JSON');
			});







		} ]);






// Visualizaci�n de resultados
agoraUSControllers.controller('VisualizacionRestController', [
		'$scope',
		'$routeParams',
		'$http',
		'$window',
		function($scope, $routeParams, $http, $window) {
			$scope.dataHasLoaded=false;
			console.log("Entra aqui");
			$scope.encuestas = [];
			resultados = '';
			if ($routeParams.encuesta == null) {
				resultados = '/api/resultados/encuestas';
			} else {
				resultados = '/api/resultados/encuestas?encuesta='
						+ $routeParams.encuesta;
			}
			$http.get(resultados).then(function successCallback(response) {
				try {
					console.log(response);
					console.log(angular.fromJson(response['data']));
					console.log(response['data'])
					$scope.encuestas = response['data'];
					showHeaderAndFooter($scope, "Encuestas");
					$scope.dataHasLoaded=true;
				} catch (err) {
					$window.location.href = "/error";
				}
			}, function errorCallback(response) {
				alert('Error obteniendo el objeto JSON');
			});
			$scope.params = $routeParams;

			console.log("cargado: "+$scope.dataHasLoaded)
		} ]);
