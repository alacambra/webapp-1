define(['app',
        'app/entities/pool',
        'app/pools/show/show_controller',
        'lib/response_handler'],
function(App, Entities, Ctrl, response_handler) {
    return describe('Pool :: Show :: Controller', function() {
        it('Should invoke show in main_region two times', function () {
            var pool_id = 9;
            var counter = 0;

            spyOn(App, 'request').andCallFake(function (event, uid) {
                var defer = $.Deferred();
                defer.resolve(new Entities.Pool({ id: uid }), null);
                return defer.promise();
            });

            spyOn(App.main_region, 'show').andCallFake(function () {
                counter++;
            });

            Ctrl.pool_show(pool_id);

            expect(counter).toBe(2);
        });

        it('Should invoke response_handler when pool request fails', function () {
            var response = 'failure';

            spyOn(App, 'request').andCallFake(function (event, uid) {
                var defer = $.Deferred();
                defer.resolve(null, response);
                return defer.promise();
            });

            spyOn(response_handler, 'handle');

            Ctrl.pool_show();

            expect(response_handler.handle).toHaveBeenCalledWith(response);
        });
    });
});