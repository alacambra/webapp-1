define(['app',
        'app/entities/user',
        'app/users/list/list_view',
        'app/app_helper',
        'app/view_helper'],
function(App, Entities, List, app_helper, view_helper) {
    var $sandbox = $('#sandbox');

    describe('User :: List :: View', function() {

        var listView = null,
            itemView = null,
            user1 = new Entities.User({
                id: 1
            }),
            user2 = new Entities.User({
                id: 2
            }),
            users = new Entities.UserCollection([
                user1,
                user2
           ]);

        beforeEach(function() {
            listView = new List.Users({
                collection: users,
                templateHelpers: _.extend({}, app_helper, view_helper)
            });
            itemView = new List.View({
                model: user1
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
            expect($sandbox.find('#js-user-list-items .list-row').length).toBe(2);
        });

        it('Check the create functionality of list view', function() {
            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="user:create"]').click();

            expect(App.trigger).toHaveBeenCalledWith('user:create');
        });

        it('Check the show functionality of item view', function() {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="user:show,' + user1.get('id') + '"]').click();

            expect(App.trigger).toHaveBeenCalledWith('user:show', user1.get('id') + '');
        });

        it('Check the edit functionality of item view', function() {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('a[href="#users/1/edit"]').click();

            expect(App.trigger).toHaveBeenCalledWith('user:edit', '1');
        });

        it('Check the delete functionality of item view', function() {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('.js-delete').click();

            expect(App.trigger).toHaveBeenCalledWith('user:delete', user1);
        });
    });
});




















