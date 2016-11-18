var agoraUSControllers = angular.module('AgoraUSControllers', [ 'ngRoute' ]);

function showHeaderAndFooter($scope, title) {
	// Esta función hay que llamarla en todos los controladores para que
	// muestren el título, header y footer
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
agoraUSControllers.controller('visualizacionController', ['$http','$scope', '$routeParams',
		function($http,$scope, $routeParams) {
		//$scope.dataHasLoaded=false;
		showHeaderAndFooter($scope, "Inicio");
			
			
			$scope.params=$routeParams;
			$http.get("api/resultados/encuestas.do?encuesta="+$routeParams.encuesta).then(function successCallback(response) {
				try {
					console.log("Cargado");	
					$scope.recuento = response['data'];
					console.log(response);
					
					showHeaderAndFooter($scope, "Encuestas");
					$scope.dataHasLoaded=true;
				} catch (err) {
					$window.location.href = "#/error.do";
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




//controller del mapa

agoraUSControllers.controller('preguntasController', ['$http','$scope', '$routeParams',
		function($http,$scope, $routeParams) {
		//$scope.dataHasLoaded=false;
		showHeaderAndFooter($scope, "Inicio");
			
			
			$scope.params=$routeParams;
			$http.get("api/resultados/preguntas/votadas.do").then(function successCallback(response) {
				try {
					console.log("Cargado");	
					$scope.prMasVotadas = response['data'];
					console.log($scope.prMasVotadas);
					
					showHeaderAndFooter($scope, "Encuestas");
					$scope.dataHasLoaded=true;
				} catch (err) {
					$window.location.href = "#/error.do";
				}
			}, function errorCallback(response) {
				alert('Error obteniendo el objeto JSON');
			});
			
			
			
			
			
		
			
		} ]);






// Visualización de resultados
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
				resultados = 'api/resultados/encuestas.do';
			} else {
				resultados = 'api/resultados/encuestas.do?encuesta='
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
					$window.location.href = "#/error.do";
				}
			}, function errorCallback(response) {
				alert('Error obteniendo el objeto JSON');
			});
			$scope.params = $routeParams;
			
			console.log("cargado: "+$scope.dataHasLoaded)
		} ]);