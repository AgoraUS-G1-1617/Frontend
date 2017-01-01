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
	$scope.social = {
		name : "social.html",
		url : "views/main/social.html"
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
		showHeaderAndFooter($scope, "Encuestas");


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
			//Tipos de gráficas
			$scope.drawColumn=function drawColumn() {
				column($scope.datosAct);
			}
			$scope.drawSemiCircle=function drawSemiCircle(){
				semicircle($scope.datosAct);
			}
			$scope.drawPie3d=function drawPie3d(){
				pie3d($scope.datosAct);
			}
			/*
			*funcion que pasa los datos a un formato lista([texto_opcion,votos]) para que se pueda representar en gráficas
			*/
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
						datos.push([ opciones[i].texto_opcion, parseInt(opciones[i].votos) ]);

					}

					$scope.datosAct = datos;


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
		    } else {
		        datos = $scope.datosAct;
		    }
	    pie(datos);

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
		showHeaderAndFooter($scope, "Estadísticas");


			$scope.params=$routeParams;
			$http.get('/api/resultados/encuestas/votadas').then(function successCallback(response) {
				try {
					console.log(response);
					original=response['data']
					$scope.encuestas = original;
					showHeaderAndFooter($scope, "Encuestas");
					$scope.dataHasLoaded=true;

					var i;
				  var maxAcum=0,maxI=0;
					for (i=0;i<	$scope.encuestas.length;i++){

						var preguntas=	$scope.encuestas[i].preguntas;
						var j;
				    var acum=0;
						for(j=0;j<preguntas.length;j++){
							var opciones=preguntas[j].opciones;
							var w;
							var semiacum=0;
							for (w=0;w<opciones.length;w++){
								semiacum+=opciones[w].votos;
							}
							acum+=semiacum;
							preguntas[j]["sumaVotos"]=semiacum;
						}
				    if (acum>maxAcum){
				    maxAcum=acum;
				    maxI=i;
				    }
					$scope.encuestas[i]["sumaTotal"]=acum;
					console.log(acum);
					}

				for (j=0;j<	$scope.encuestas[maxI].preguntas.length;j++){
				  var opciones=	$scope.encuestas[maxI].preguntas[j].opciones;
				  var w;
				  var acum=0;

				  for (w=0;w<opciones.length;w++){
				    acum+=opciones[w].votos;
				  }

		}
		$scope.maxAcum=maxAcum;
				console.log(maxAcum);
				//hay que reasignarlas encuestas para que se actualicen respecto de la carga de datos (ng-show sumaTotal==maxAcum)
				$scope.encuestas=$scope.encuestas;
				} catch (err) {
					$window.location.href = "/error";
				}
			}, function errorCallback(response) {
				alert('Error obteniendo el objeto JSON');
			});


		$scope. idActual = -1;
		$scope. datosAct;

		$scope.parseaDatos=	function parseaDatos(boton, preguntas) {
				var posicion = boton.id_votacion;

				if ($scope.idActual != posicion) {
					var datos = [];
					$scope.idActual = posicion;
			    console.log(preguntas)
					var i;
					for(i=0;i<preguntas.length;i++){
							datos.push([ preguntas[i].texto_pregunta, parseInt(preguntas[i].sumaVotos) ]);

					}

					console.log(datos);

					$scope.datosAct = datos;
					//$(".active").attr('class', '');;

				}

				return $scope.datosAct;
			}

			$scope.drawColumn=function drawColumn() {
				column($scope.datosAct);
			}
			$scope.drawSemiCircle=function drawSemiCircle(){
				semicircle($scope.datosAct);
			}
			$scope.drawPie3d=function drawPie3d(){
				pie3d($scope.datosAct);
			}
		$scope.drawPie=	function drawPie(encuesta) {
				var datos;
			  console.log(encuesta)
				if (encuesta) {
					console.log("parseando")
					datos = $scope.parseaDatos(encuesta,encuesta.preguntas);
					$("#representacion").show();
					//$("#representacion").collapse("show");
				} else {
					datos = $scope.datosAct;
				}

				pie(datos);

			}
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
