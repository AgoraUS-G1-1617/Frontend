// var auth = require("../authModule");
// var modif = require("../modificationModule");

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
                {"id_respuesta":0,"nombre":"Mariano Rajoy","votos":10},
                {"id_respuesta":1,"nombre":"Pdro Snchz","votos":9},
                {"id_respuesta":2,"nombre":"Pablo Iglesias","votos":8},
                {"id_respuesta":3,"nombre":"Albert Rivera","votos":7}
              ];
        var boton=document.createElement("input")
        boton.id_pregunta=0
        expect(boton.id_pregunta).toBe(0)
        expect($scope.parseaDatos(boton,json)).toEqual([ ["Mariano Rajoy",10],
                  ["Pdro Snchz",9], ["Pablo Iglesias",8], ["Albert Rivera",7]]);
      expect($scope.title).toEqual("Encuestas");
    });
  });
});
