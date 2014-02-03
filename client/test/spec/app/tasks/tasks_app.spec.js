define(['app',
        'app/tasks/tasks_app',
        'app/entities/task' ],
function (App, TasksApp, Entities) {

    describe('Task :: App', function () {

        it('Navigate to tasks list.', function () {
            spyOn(App, 'navigate');

            App.trigger('tasks:list');

            expect(App.navigate).toHaveBeenCalledWith('tasks');
        });

        it('Navigate to new task.', function () {
            spyOn(App, 'navigate');

            App.trigger('task:create');

            expect(App.navigate).toHaveBeenCalledWith('tasks/new');
        });

        it('Navigate to show task.', function () {
            var id = 1;

            spyOn(App, 'navigate');

            App.trigger('task:show', id);

            expect(App.navigate).toHaveBeenCalledWith('tasks/' + id);
        });

        it('Navigate to edit task.', function () {
            var id = 1;

            spyOn(App, 'navigate');

            App.trigger('task:edit', id);

            expect(App.navigate).toHaveBeenCalledWith('tasks/' + id + '/edit');
        });

        it('Confirm to delete task.', function () {
            var task = new Entities.Task({
                    id: 1,
                    title: 'Task1'
                }),
                redirect = 'redirect';

            spyOn(window, 'confirm');

            App.trigger('task:delete', task, redirect);

            expect(window.confirm).toHaveBeenCalledWith(jasmine.any(String));
        });

        describe('API', function () {
            it('Should delete a specified task with optional redirect', function () {
                var task = new Entities.Task({ id: 2 });
                var redirect;

                spyOn(window, 'confirm').andReturn(true);
                spyOn(App, 'trigger').andCallThrough();
                spyOn(task, 'destroy');

                App.trigger('task:delete', task, redirect);

                expect(task.destroy).toHaveBeenCalled();
                expect(App.trigger).not.toHaveBeenCalledWith(redirect);

                redirect = 'home';

                App.trigger('task:delete', task, redirect);

                expect(task.destroy).toHaveBeenCalled();
                expect(App.trigger).toHaveBeenCalledWith(redirect);
            });

            it('Moving a task to a project should use correct parameters', function () {
                var task = new Entities.Task({ id: 28 });
                var target_project_id = 4;
                var method = null;
                var model = null;
                var options = null;

                spyOn(Backbone, 'sync').andCallFake(function (_method, _model, _options) {
                    method = _method;
                    model = _model;
                    options = _options;
                });

                App.trigger('task:assoc:to:project', task, target_project_id);

                expect(method).toBe('update');
                expect(model).toBe(task);
                expect(options.data).toEqual(undefined);
                var s = '/tasks/' + task.get('id') + '/in/project/' + target_project_id;
                expect(options.url).toMatch(new RegExp(s));

                task.set('project', {
                    id: 2,
                    title: 'p2'
                });

                App.trigger('task:assoc:to:project', task, target_project_id);

                s = '/tasks/' + task.get('id') + '/from/project/' + task.get('project').id + '/to/' + target_project_id;
                expect(options.url).toMatch(new RegExp(s));
            });

            it('Moving a task to a task should use correct parameters', function () {
                var task = new Entities.Task({ id: 22 });
                var target_task_id = 8;
                var method = null;
                var model = null;
                var options = null;

                spyOn(Backbone, 'sync').andCallFake(function (_method, _model, _options) {
                    method = _method;
                    model = _model;
                    options = _options;
                });

                App.trigger('task:assoc:to:task', task, target_task_id);

                expect(method).toBe('update');
                expect(model).toBe(task);
                expect(options.data).toEqual(undefined);
                var s = '/tasks/' + task.get('id') + '/as/subtask/' + target_task_id;
                expect(options.url).toMatch(new RegExp(s));

                task.set('parentId', 5);

                App.trigger('task:assoc:to:task', task, target_task_id);

                s = '/tasks/' + task.get('id') + '/from/task/' + task.get('parentId') + '/to/' + target_task_id;
                expect(options.url).toMatch(new RegExp(s));
            });
        });
    });
});