define(['app',
        'app/entities/task',
        'app/tasks/list/list_controller',
        'lib/response_handler'],
function (App, Entities, Ctrl, response_handler) {
    return describe('Task :: List :: Controller', function () {
        it('Should invoke show in main_region two times', function () {
            var counter = 0;

            spyOn(App, 'request').andCallFake(function (event) {
                var defer = $.Deferred();
                defer.resolve(new Entities.TaskCollection([ { id: 1 }, { id: 2 }, { id: 3 } ]));
                return defer.promise();
            });

            spyOn(App.main_region, 'show').andCallFake(function () {
                counter++;
            });

            Ctrl.tasks_list();

            // LoadingView +1
            // Project List_View +1
            expect(counter).toBe(2);
        });

        it('Should invoke response_handler when task request fails', function () {
            var response = 'failure';

            spyOn(App, 'request').andCallFake(function (event) {
                var defer = $.Deferred();
                defer.resolve(undefined, response);
                return defer.promise();
            });

            spyOn(response_handler, 'handle');

            Ctrl.tasks_list();

            expect(response_handler.handle).toHaveBeenCalledWith(response);
        });

        it('Should delete a specified task with optional redirect', function () {
            var task = new Entities.Task({ id: 2 });
            var redirect;

            spyOn(App, 'request').andCallFake(function (event, t) {
                var defer = $.Deferred();
                defer.resolve(t);
                return defer.promise();
            });

            spyOn(task, 'destroy');
            spyOn(App, 'trigger');

            Ctrl.task_delete(task);

            expect(task.destroy).toHaveBeenCalled();
            expect(App.trigger).not.toHaveBeenCalled();

            redirect = 'redirect';

            Ctrl.task_delete(task, redirect);

            expect(App.trigger).toHaveBeenCalledWith(redirect);
        });
    });
});