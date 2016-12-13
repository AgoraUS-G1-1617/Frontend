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
agoraUSControllers.controller('MainController', [ '$scope', '$route','$translate',
		'$routeParams', '$location',
		function($scope, $route, $translate,$routeParams, $location) {
			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;
			//función para cambiar el idioma
			$scope.changeLanguage = function (langKey) {
				$translate.use(langKey);
			};
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
					$scope.recuento = response['data'];
					if($scope.recuento==null){
					$scope.recuento = response['data'][0];
				}
					console.log($scope.recuento);
				
					showHeaderAndFooter($scope, "Encuestas");
					$scope.dataHasLoaded=true;
				} catch (err) {
					console.log("here");
					$window.location.href = "/error";
				}
			}, function errorCallback(response) {
				alert('Error obteniendo el objeto JSON');
			});
			$scope.idActual = -1;
			$scope.datosAct;
		  $scope.opciones;
			$scope.drawColumn=function drawColumn() {
				column($scope.datosAct);
			}
			$scope.drawSemiCircle=function drawSemiCircle(){
				semicircle($scope.datosAct);
			}
			$scope.drawPie3d=function drawPie3d(){
				pie3d($scope.datosAct);
			}
			$scope.parseaDatos=function parseaDatos(boton, opciones) {
				var posicion = boton.id_pregunta;
				console.log(posicion)
				console.log(opciones)

				if ($scope.idActual != posicion) {

					//[ [ "Si", parseInt(numSi) ], [ "No", parseInt(numNo) ] ]
					var datos = [];

					$scope.idActual = posicion;

					var i;
					for (i = 0; i < opciones.length; i++) {
						datos.push([ opciones[i].nombre, parseInt(opciones[i].votos) ]);

					}

					$scope.datosAct = datos;
					$(".active").attr('class', '');;

				}

				return $scope.datosAct;
			}

			$scope.drawPie=function drawPie(pregunta) {
				var datos;
		    if (pregunta) {

		      $scope.opciones=pregunta.opciones;
		      console.log(pregunta)
		      datos = $scope.parseaDatos(pregunta,$scope.opciones);
		      $("#representacion").show();
		      //$("#representacion").collapse("show");
		    pie(datos);
		    } else {
		        datos = $scope.datosAct;
		        pie(datos);
		    }


			}
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
			$http.get('/api/resultados/encuestas/votadas').then(function successCallback(response) {
				try {
					console.log(response);
					original=response['data']
					$scope.encuestas = original;
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
