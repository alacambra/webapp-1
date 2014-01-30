define(['app',
        'app/entities/task',
        'app/tasks/show/show_controller',
        'lib/response_handler'],
function (App, Entities, Ctrl, response_handler) {
    return describe('Task :: Show :: Controller', function () {
        it('Should invoke show in main_region two times', function () {
            var task_id = 5;
            var counter = 0;

            spyOn(App, 'request').andCallFake(function (event, tid) {
                var defer = $.Deferred();
                defer.resolve(new Entities.Task({ id: tid }), null);
                return defer.promise();
            });

            spyOn(App.main_region, 'show').andCallFake(function () {
                counter++;
            });

            Ctrl.task_show(task_id);

            // LoadingView +1
            // Task Show_View +1
            expect(counter).toBe(2);
        });

        it('Should invoke response_handler when task request fails', function () {
            var response = 'failure';

            spyOn(App, 'request').andCallFake(function (event, tid) {
                var defer = $.Deferred();
                defer.resolve(undefined, response);
                return defer.promise();
            });

            spyOn(response_handler, 'handle');

            Ctrl.task_show();

            expect(response_handler.handle).toHaveBeenCalledWith(response);
        });
    });
});