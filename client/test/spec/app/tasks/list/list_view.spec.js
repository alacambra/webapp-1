define([ 'app', 'app/entities/task', 'app/tasks/list/list_view' ], function (App, Entities, List) {

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
                collection: tasks
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

            $sandbox.find('.js-create').click();

            expect(App.trigger).toHaveBeenCalledWith('task:new');
        });

        it('Check the show functionality of item view.', function () {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('.js-title').click();

            expect(App.trigger).toHaveBeenCalledWith('task:show', task1.get('id'));
        });

        it('Check the edit functionality of item view.', function () {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('.js-edit').click();

            expect(App.trigger).toHaveBeenCalledWith('task:edit', task1.get('id'));
        });

        it('Check the delete functionality of item view.', function () {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('.js-delete').click();

            expect(App.trigger).toHaveBeenCalledWith('task:delete', task1);
        });
    });
});




















