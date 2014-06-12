(function () {
    'use strict';
    describe("MainCtrl", function () {

        beforeEach(module("frontendPrototypeApp"));

        var $scope, $rootScope, $controller, controllerLoader, DataProvider;

        beforeEach(inject(function ($injector) {

            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');
            $scope = $rootScope.$new();

            controllerLoader = function () {
                return $controller('MainCtrl', {
                    '$scope': $scope
                });
            };
        }));

        it("Test working", function () {
            var controller = controllerLoader();
            expect($scope).toBeDefined(); 
        });

    });
}());