describe('Inyectar controlador', function() {
  beforeEach(module('AgoraUSControllers'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('Test estructura general', function() {
    it('', function() {
      var $scope = {};
      var controller = $controller('MainController', { $scope: $scope });

      expect($scope.title).toEqual(null);
      expect($scope.header['name']).toEqual("header.html");
    });
  });
});
