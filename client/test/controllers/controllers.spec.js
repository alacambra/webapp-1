describe("ConfirmModalCtrl", function() {
    
    beforeEach(module("poolingpeopleApp"))
    
    it ("basic test", inject(function ($rootScope, $controller) {

        var scope = $rootScope;
    
        var ctrl = $controller('ConfirmModalCtrl', {
            scope: scope.$new()
        });
         
        
    }))
})