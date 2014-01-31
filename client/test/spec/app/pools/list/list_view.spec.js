define(['app',
        'app/entities/pool',
        'app/pools/list/list_view',
        'app/app_helper',
        'app/view_helper'],
function(App, Entities, List, app_helper, view_helper) {
    var $sandbox = $('#sandbox');

    describe('Pool :: List :: View', function() {

        var listView = null,
            itemView = null,
            pool1 = new Entities.Pool({
                id: 1
            }),
            pool2 = new Entities.Pool({
                id: 2
            }),
            pools = new Entities.PoolCollection([
                pool1,
                pool2
           ]);

        beforeEach(function() {
            listView = new List.View({
                collection: pools,
                templateHelpers: _.extend({}, app_helper, view_helper)
            });
            itemView = new List.ItemView({
                model: pool1
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
            expect($sandbox.find('#js-pool-list-items .list-row').length).toBe(2);
        });

        it('Check the create functionality of list view', function() {
            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="pool:create"]').click();

            expect(App.trigger).toHaveBeenCalledWith('pool:create');
        });

        it('Check the show functionality of item view', function() {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="pool:show,' + pool1.get('id') + '"]').click();

            expect(App.trigger).toHaveBeenCalledWith('pool:show', pool1.get('id') + '');
        });

        it('Check the edit functionality of item view', function() {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('a[href="#pools/1/edit"]').click();

            expect(App.trigger).toHaveBeenCalledWith('pool:edit', '1');
        });

        it('Check the delete functionality of item view', function() {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('.js-delete-pool').click();

            expect(App.trigger).toHaveBeenCalledWith('pool:delete', pool1);
        });
    });
});




















