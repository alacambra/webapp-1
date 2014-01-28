define(['app',
        'app/entities/effort',
        'app/efforts/show/show_controller',
        'lib/response_handler'],
function(App, Entities, Ctrl, response_handler) {
    return describe('Effort :: Show :: Controller', function() {
        it('Should invoke show in main_region two times', function () {
            var effort_id = 7;
            var task_id = 12;
            var counter = 0;

            spyOn(App, 'request').andCallFake(function (event, tid, eid) {
                var defer = $.Deferred();
                defer.resolve(new Entities.Effort({ id: eid }, { task_id: tid }));
                return defer.promise();
            });

            spyOn(App.main_region, 'show').andCallFake(function () {
                counter++;
            });

            Ctrl.effort_show(task_id, effort_id);

            // LoadingView +1
            // Effort Show_View +1
            expect(counter).toBe(2);
        });

        it('Should invoke response_handler when effort request fails', function () {
            var response = 'failure';

            spyOn(App, 'request').andCallFake(function (event, tid, eid) {
                var defer = $.Deferred();
                defer.resolve(undefined, response);
                return defer.promise();
            });

            spyOn(response_handler, 'handle');

            Ctrl.effort_show();

            expect(response_handler.handle).toHaveBeenCalledWith(response);
        });
    });
});