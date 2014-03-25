describe ("controller", function() {

    beforeEach(module("poolingpeopleApp"));

    var $scope, $rootScope, controllerLoader;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();

        var $controller = $injector.get('$controller');

        controllerLoader = function() {
            return $controller('NavCtrl', {
                '$scope': $scope
            });
        };
    }));

    it ("testing injection", function() {

        var controller = controllerLoader();
        expect($scope).toNotEqual({});

    })

});