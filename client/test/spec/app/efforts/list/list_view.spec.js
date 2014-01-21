define(['app',
        'app/entities/effort',
        'app/efforts/list/list_view',
        'app/app_helper',
    'app/view_helper'],
function(App, Entities, List, app_helper, view_helper) {
    var $sandbox = $('#sandbox');

    describe('Effort :: List :: View', function() {
        var listView = null,
            itemView = null,
            effort1 = new Entities.Effort({
                id: 1
            }, {
                task_id: 2
            }),
            effort2 = new Entities.Effort({
                id: 2
            }, {
                task_id: 3
            }),
            efforts = new Entities.EffortCollection([
                effort1,
                effort2
            ], { task_id: 23 });

        beforeEach(function() {
            listView = new List.Efforts({
                collection: efforts,
                templateHelpers: _.extend({}, app_helper, view_helper)
            });
            itemView = new List.View({
                model: effort1
            });
            $sandbox.html(listView.render().$el);
        });

        afterEach(function() {
            listView.remove();
            itemView.remove();
            $sandbox.html('');
        });

        it('The render function of list should always return the list view itself', function() {
            expect(listView.render()).toBe(listView);
        });

        it('The render function of item should always return the item view itself', function() {
            expect(itemView.render()).toBe(itemView);
        });

        it('This list view should be represented by a \'div\' element', function() {
            expect(listView.el.tagName.toLowerCase()).toBe('div');
        });

        it('This item view should be represented by a \'div\' element', function() {
            expect(itemView.el.tagName.toLowerCase()).toBe('div');
        });

        it('Check if list view rendered two items', function() {
            expect($sandbox.find('#js-effort-list-items .list-row').length).toBe(2);
        });

        it('Check the create functionality of list view', function() {
            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="effort:create,23"]').click();

            expect(App.trigger).toHaveBeenCalledWith('effort:create', 23 + '');
        });

        it('Check the show functionality of item view', function() {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="effort:show,' + effort1.task_id + ',' + effort1.get('id') + '"]').click();

            expect(App.trigger).toHaveBeenCalledWith('effort:show', effort1.task_id + '', effort1.get('id') + '');
        });

        it('Check the edit functionality of item view', function() {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="effort:edit,' + effort1.task_id + ',' + effort1.get('id') + '"]').click();

            expect(App.trigger).toHaveBeenCalledWith('effort:edit', effort1.task_id + '', effort1.get('id') + '');
        });

        it('Check the delete functionality of item view', function() {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('.js-delete').click();

            expect(App.trigger).toHaveBeenCalledWith('effort:delete', effort1.task_id, effort1);
        });
    });
});
