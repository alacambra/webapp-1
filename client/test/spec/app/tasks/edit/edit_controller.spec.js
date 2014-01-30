define(['app',
        'app/entities/task',
        'app/tasks/edit/edit_controller',
        'lib/response_handler',
        'app/entities/user'],
function (App, Entities, Ctrl, response_handler) {
    return describe('Task :: Edit :: Controller', function () {
        it('Should invoke show in main region two times', function () {
            var task_id = 6;
            var counter = 0;

            spyOn(App, 'request').andCallFake(function (event, tid) {
                var defer = $.Deferred();
                if (event === 'task:entity') {
                    defer.resolve(new Entities.Task({ id: tid }), null);
                } else if (event === 'user:entities') {
                    defer.resolve(new Entities.UserCollection([ { id: 1 }, { id: 2 }, { id: 3 } ]), null);
                }
                return defer.promise();
            });

            spyOn(App.main_region, 'show').andCallFake(function () {
                counter++;
            });

            Ctrl.task_edit(task_id);

            // LoadingView +1
            // Task List_View +1
            expect(counter).toBe(2);
        });

        it('Should invoke response_handler when task request fails', function () {
            var response = 'failure';

            spyOn(App, 'request').andCallFake(function (event, tid) {
                var defer = $.Deferred();
                if (event === 'task:entity') {
                    defer.resolve(undefined, response);
                } else if (event === 'user:entities') {
                    defer.resolve(new Entities.UserCollection([ { id: 1 }, { id: 2 }, { id: 3 } ]), null);
                }
                return defer.promise();
            });

            spyOn(response_handler, 'handle');

            Ctrl.task_edit(1);

            expect(response_handler.handle).toHaveBeenCalledWith(response);
        });

        it('Should invoke response_handler when user request fails', function () {
            var response = 'failure';

            spyOn(App, 'request').andCallFake(function (event, tid) {
                var defer = $.Deferred();
                if (event === 'task:entity') {
                    defer.resolve(new Entities.Task({ id: tid }), null);
                } else if (event === 'user:entities') {
                    defer.resolve(undefined, response);
                }
                return defer.promise();
            });

            spyOn(response_handler, 'handle');

            Ctrl.task_edit(1);

            expect(response_handler.handle).toHaveBeenCalledWith(response);
        });
    });
});