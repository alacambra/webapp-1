define(['app',
    'app/entities/effort',
    'app/efforts/edit/edit_controller',
    'lib/response_handler'],
function(App, Entities, Ctrl, response_handler) {
    return describe('Effort :: Edit :: Controller', function() {
        it('Should invoke show in main region two times', function () {
            var effort_id = 5;
            var task_id = 8;
            var counter = 0;

            spyOn(App, 'request').andCallFake(function (event, tid, eid) {
                var defer = $.Deferred();
                defer.resolve(new Entities.Effort({ id: eid }, { task_id: tid }), null)
                return defer.promise();
            });

            spyOn(App.main_region, 'show').andCallFake(function () {
                counter++;
            });

            Ctrl.effort_edit(task_id, effort_id);

            // LoadingView +1
            // Effort Edit_View +1
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

            Ctrl.effort_edit();

            expect(response_handler.handle).toHaveBeenCalledWith(response);
        });
    });
});