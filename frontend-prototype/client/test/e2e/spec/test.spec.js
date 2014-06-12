(function () {
    'use strict';

    describe('basic test', function () {
        it('check testing enviroment', function () {
            expect(browser).toBeDefined();
            expect(element).toBeDefined();
        });

    });
    
}());