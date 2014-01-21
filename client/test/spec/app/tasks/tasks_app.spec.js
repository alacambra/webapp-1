define([ 'app', 'app/tasks/tasks_app', 'app/entities/task' ], function (App, TasksApp, Entities) {

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
    });
});