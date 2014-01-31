define(['app',
        'app/entities/pool',
        'app/pools/list/list_controller',
        'lib/response_handler'],
function(App, Entities, Ctrl, response_handler) {
    return describe('Pool :: List :: Controller', function() {
        it('Should invoke show in main_region two times', function () {
            var counter = 0;

            spyOn(App, 'request').andCallFake(function (event) {
                var defer = $.Deferred();
                defer.resolve(new Entities.PoolCollection([ { id: 1 }, { id: 2 }, { id: 3 } ]));
                return defer.promise();
            });

            spyOn(App.main_region, 'show').andCallFake(function () {
                counter++;
            });

            Ctrl.pools_list();

            // LoadingView +1
            // Pool List_View +1
            expect(counter).toBe(2);
        });

        it('Should invoke response_handler when pool request fails', function () {
            var response = 'failure';

            spyOn(App, 'request').andCallFake(function (event) {
                var defer = $.Deferred();
                defer.resolve(undefined, response);
                return defer.promise();
            });

            spyOn(response_handler, 'handle');

            Ctrl.pools_list();

            expect(response_handler.handle).toHaveBeenCalledWith(response);
        });
        
        it('Should delete a specified pool with optional redirect', function () {
            var pool = new Entities.Pool({ id: 4 });
            var redirect;
            
            spyOn(App, 'request').andCallFake(function (event, u) {
                var defer = $.Deferred();
                defer.resolve(u);
                return defer.promise();
            });

            spyOn(pool, 'destroy');
            spyOn(App, 'trigger');

            Ctrl.pool_delete(pool);

            expect(pool.destroy).toHaveBeenCalled();
            expect(App.trigger).not.toHaveBeenCalled();

            redirect = 'redirect';

            Ctrl.pool_delete(pool, redirect);

            expect(App.trigger).toHaveBeenCalledWith(redirect);
        });
    });
});