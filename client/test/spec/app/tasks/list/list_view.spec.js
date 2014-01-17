define(['app',
        'app/entities/task',
        'app/tasks/list/list_view',
        'app/app_helper',
        'app/view_helper'],
function (App, Entities, List, app_helper, view_helper) {
    var $sandbox = $('#sandbox');

    describe('Task :: List :: View', function () {

        var listView = null,
            itemView = null,
            task1 = new Entities.Task({
                id: 1
            }),
            task2 = new Entities.Task({
                id: 2
            }),
            tasks = new Entities.TaskCollection([
                task1,
                task2
            ]);

        beforeEach(function () {
            listView = new List.Tasks({
                collection: tasks,
                templateHelpers: $.extend({}, app_helper, view_helper)
            });
            itemView = new List.View({
                model: task1
            });
            $sandbox.html(listView.render().$el);
        });

        afterEach(function () {
            listView.remove();
            itemView.remove();
            $sandbox.html('');
        });

        it('The render function of list should always return the list view itself.', function () {
            expect(listView.render()).toBe(listView);
        });

        it('The render function of item should always return the item view itself.', function () {
            expect(itemView.render()).toBe(itemView);
        });

        it('This list view should be represented by a \'div\' element.', function () {
            expect(listView.el.tagName.toLowerCase()).toBe('div');
        });

        it('This item view should be represented by a \'div\' element.', function () {
            expect(itemView.el.tagName.toLowerCase()).toBe('div');
        });

        it('Check if list view rendered two items.', function () {
            expect($sandbox.find('#js-task-list-items .list-row').length).toBe(2);
        });

        it('Check the create functionality of list view.', function () {
            spyOn(App, 'trigger');

            $sandbox.find('a[href="#tasks/new"]').click();

            expect(App.trigger).toHaveBeenCalledWith('task:new');
        });

        it('Check the show functionality of item view.', function () {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('a[href="#tasks/1"]').click();

            expect(App.trigger).toHaveBeenCalledWith('task:show', task1.get('id') + '');
        });

        it('Check the edit functionality of item view.', function () {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('a[href="#tasks/1/edit"]').click();

            expect(App.trigger).toHaveBeenCalledWith('task:edit', task1.get('id') + '');
        });

        it('Check the delete functionality of item view.', function () {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('.js-delete').click();

            expect(App.trigger).toHaveBeenCalledWith('task:delete', task1);
        });
    });
});




















