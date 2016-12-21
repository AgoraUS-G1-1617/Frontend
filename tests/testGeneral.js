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
      expect($scope.title).toEqual("Titulo");
    });
  });
});
