// var auth = require("../authModule");
// var modif = require("../modificationModule");
//Aquí van los tests con jasmine
describe('Inyectar controlador', function() {
  beforeEach(angular.mock.module('AgoraUSControllers','ngRoute'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('Test estructura general', function() {
    it('Test cabecera', function() {
      expect(4).toBe(2+2);
      var $scope = {},$route, $translate,$routeParams, $location;
      var controller = $controller('MainController', { $scope: $scope, $route:$route,
        $translate:$translate,$routeParams:$routeParams, $location:$location});

      expect($scope.title).toEqual(null);
      expect($scope.header['name']).toEqual("header.html");
    });

    it('Test parseaDatos', function() {
      var $scope = {};
      var controller = $controller('visualizacionController', { $scope: $scope });
      var json=[
                {"id_opcion":0,"texto_opcion":"Mariano Rajoy","votos":10},
                {"id_opcion":1,"texto_opcion":"Pdro Snchz","votos":9},
                {"id_opcion":2,"texto_opcion":"Pablo Iglesias","votos":8},
                {"id_opcion":3,"texto_opcion":"Albert Rivera","votos":7}
              ];
        var boton=document.createElement("input")
        boton.id_pregunta=0
        expect(boton.id_pregunta).toBe(0)
        expect($scope.parseaDatos(boton,json)).toEqual([ ["Mariano Rajoy",10],
                  ["Pdro Snchz",9], ["Pablo Iglesias",8], ["Albert Rivera",7]]);
      expect($scope.title).toEqual("Encuestas");
    });

    it('Test estadisticas', function() {
      var $scope = {};
      var controller = $controller('preguntasController', { $scope: $scope });
      var json=[
                {"texto_pregunta":"Mariano Rajoy","sumaVotos":10},
                {"texto_pregunta":"Pdro Snchz","sumaVotos":7},
                {"texto_pregunta":"Albert Rivera","sumaVotos":5},
                {"texto_pregunta":"Pablo Iglesias","sumaVotos":8}
              ];
        var boton=document.createElement("input")
        boton.id_pregunta=0
        expect(boton.id_pregunta).toBe(0)
        $scope.parseaDatos(boton,json)
        expect($scope.datosAct).toEqual([ ["Mariano Rajoy",10],
                  ["Pdro Snchz",7], ["Albert Rivera",5], ["Pablo Iglesias",8]]);
      expect($scope.title).toEqual("Estadísticas");
    });

  });

});
