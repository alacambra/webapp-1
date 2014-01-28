define(['app',
        'app/entities/effort',
        'app/efforts/list/list_controller',
        'lib/response_handler'],
function(App, Entities, Ctrl, response_handler) {
    return describe('Effort :: List :: Controller', function() {
        it('Should invoke show in main region two times', function () {
            var defer = $.Deferred();
            var task_id = 11;
            var counter = 0;

            spyOn(App, 'request').andCallFake(function (event, tid) {
                defer.resolve(new Entities.EffortCollection([ { id: 1 }, { id: 2 }, { id: 3 } ], { task_id: tid }));
                return defer.promise();
            });

            spyOn(App.main_region, 'show').andCallFake(function () {
                counter++;
            });

            Ctrl.efforts_list(task_id);

            // LoadingView +1
            // Effort List_View +1
            expect(counter).toBe(2);
        });

        it('Should invoke response_handler when effort request fails', function () {
            var defer = $.Deferred();
            var response = 'failure';

            spyOn(App, 'request').andCallFake(function (event, tid) {
                defer.resolve(undefined, response);
                return defer.promise();
            });

            spyOn(response_handler, 'handle');

            Ctrl.efforts_list();

            expect(response_handler.handle).toHaveBeenCalledWith(response);
        });

        it('Should delete a specified effort with optional redirect', function () {
            var defer = $.Deferred();
            var task_id = 21;
            var effort = new Entities.Effort({ id: 2 }, { task_id: task_id });
            var redirect;

            spyOn(App, 'request').andCallFake(function (event, tid, eff) {
                defer.resolve(eff);
                return defer.promise();
            });

            spyOn(effort, 'destroy');
            spyOn(App, 'trigger');

            Ctrl.effort_delete(task_id, effort, redirect);

            expect(effort.destroy).toHaveBeenCalled();
            expect(App.trigger).not.toHaveBeenCalled();

            redirect = 'redirect';

            Ctrl.effort_delete(task_id, effort, redirect);

            expect(App.trigger).toHaveBeenCalledWith(redirect, task_id);
        });
    });
});