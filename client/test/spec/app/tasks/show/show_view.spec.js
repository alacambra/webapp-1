define([ 'app', 'app/entities/task', 'app/tasks/show/show_view' ], function (App, Entities, Show) {

    var $sandbox = $('#sandbox');

    describe('Task :: Show :: View', function () {

        var view = null,
            task = new Entities.Task({
                id: 8
            });

        beforeEach(function () {
            view = new Show.View({
                model: task
            });
            $sandbox.html(view.render().$el);
        });

        afterEach(function () {
            view.remove();
            $sandbox.html('');
        });

        it('The render function should always return the view itself.', function () {
            expect(view.render()).toBe(view);
        });

        it('This view should be represented by a \'div\' element.', function () {
            expect(view.el.tagName.toLowerCase()).toBe('div');
        });

        it('Check the model of the view.', function () {
            expect(view.model.get('title')).toBeFalsy();

            view = new Show.View({
                model: new Entities.Task({
                    title: 'test'
                })
            });

            expect(view.model.get('title')).toBe('test');
        });

        it('Check the edit functionality.', function () {
            spyOn(App, 'trigger');

            $sandbox.find('a[href="#tasks/8/edit"]').click();

            expect(App.trigger).toHaveBeenCalledWith('task:edit', task.get('id') + '');
        });

        it('Check the delete functionality.', function () {
            spyOn(App, 'trigger');

            $sandbox.find('.js-delete-task').click();

            expect(App.trigger).toHaveBeenCalledWith('task:delete', task, 'tasks:list');
        });
    });
});