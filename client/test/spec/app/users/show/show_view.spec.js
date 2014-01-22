define(['app', 'app/entities/user', 'app/users/show/show_view'], function(App, Entities, Show) {
    var $sandbox = $('#sandbox');

    describe('User :: Show :: View', function() {
        var view = null,
            user = new Entities.User({
                id: 8
            });

        beforeEach(function() {
            view = new Show.View({
                model: user
            });
            $sandbox.html(view.render().$el);
        });

        afterEach(function() {
            view.remove();
            $sandbox.html('');
        });

        it('The render function should always return the view itself', function() {
            expect(view.render()).toBe(view);
        });

        it('This view should be represented by a \'div\' element', function() {
            expect(view.el.tagName.toLowerCase()).toBe('div');
        });

        it('Check the model of the view', function() {
            expect(view.model.get('title')).toBeFalsy();

            view = new Show.View({
                model: new Entities.User({
                    title: 'test'
                })
            });

            expect(view.model.get('title')).toBe('test');
        });

        it('Check the edit functionality', function() {
            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="user:edit,' + user.get('id') + '"]').click();

            expect(App.trigger).toHaveBeenCalledWith('user:edit', user.get('id') + '');
        });

        it('Check the delete functionality', function() {
            spyOn(App, 'trigger');

            $sandbox.find('.js-delete').click();

            expect(App.trigger).toHaveBeenCalledWith('user:delete', user, 'users:list');
        });
    });
});