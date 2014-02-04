define(['app', 'app/users/users_app', 'app/entities/user'], function(App, UsersApp, Entities) {
    describe('User :: App', function() {
        it('Navigate to users list', function() {
            spyOn(App, 'navigate');

            App.trigger('users:list');

            expect(App.navigate).toHaveBeenCalledWith('users');
        });

        it('Navigate to new user', function() {
            spyOn(App, 'navigate');

            App.trigger('user:create');

            expect(App.navigate).toHaveBeenCalledWith('users/new');
        });

        it('Navigate to show user', function() {
            var id = 1;

            spyOn(App, 'navigate');

            App.trigger('user:show', id);

            expect(App.navigate).toHaveBeenCalledWith('users/' + id);
        });

        it('Navigate to edit user', function() {
            var id = 1;

            spyOn(App, 'navigate');

            App.trigger('user:edit', id);

            expect(App.navigate).toHaveBeenCalledWith('users/' + id + '/edit');
        });

        it('Confirm to delete user', function() {
            var user = new Entities.User({
                    id: 1,
                    title: 'User1'
                }),
                redirect = 'redirect';

            spyOn(window, 'confirm');

            App.trigger('user:delete', user, redirect);

            expect(window.confirm).toHaveBeenCalledWith(jasmine.any(String));
        });

        describe('API', function () {
            it ('Should delete a specified user with optional redirect', function () {
                var user = new Entities.User({ id: 4 });
                var redirect;

                spyOn(window, 'confirm').andReturn(true);
                spyOn(App, 'trigger').andCallThrough();
                spyOn(user, 'destroy');

                App.trigger('user:delete', user, redirect);

                expect(user.destroy).toHaveBeenCalled();
                expect(App.trigger).not.toHaveBeenCalledWith(redirect);

                redirect = 'home';

                App.trigger('user:delete', user, redirect);

                expect(user.destroy).toHaveBeenCalled();
                expect(App.trigger).toHaveBeenCalledWith(redirect);
            });
        });
    });
});