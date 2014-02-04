define(['app', 'app/pools/pools_app', 'app/entities/pool'], function(App, PoolsApp, Entities) {
    describe('Pool :: App', function() {
        it('Navigate to pools list', function() {
            spyOn(App, 'navigate');

            App.trigger('pools:list');

            expect(App.navigate).toHaveBeenCalledWith('pools');
        });

        it('Navigate to new pool', function() {
            spyOn(App, 'navigate');

            App.trigger('pool:create');

            expect(App.navigate).toHaveBeenCalledWith('pools/new');
        });

        it('Navigate to show pool', function() {
            var id = 1;

            spyOn(App, 'navigate');

            App.trigger('pool:show', id);

            expect(App.navigate).toHaveBeenCalledWith('pools/' + id);
        });

        it('Navigate to edit pool', function() {
            var id = 1;

            spyOn(App, 'navigate');

            App.trigger('pool:edit', id);

            expect(App.navigate).toHaveBeenCalledWith('pools/' + id + '/edit');
        });

        it('Confirm to delete pool', function() {
            var pool = new Entities.Pool({
                    id: 1,
                    title: 'Pool1'
                }),
                redirect = 'redirect';

            spyOn(window, 'confirm');

            App.trigger('pool:delete', pool, redirect);

            expect(window.confirm).toHaveBeenCalledWith(jasmine.any(String));
        });

        describe('API', function () {
            it('Should delete a specified pool with optional redirect', function () {
                var pool = new Entities.Pool({ id: 3 });
                var redirect;

                spyOn(window, 'confirm').andReturn(true);
                spyOn(App, 'trigger').andCallThrough();
                spyOn(pool, 'destroy');

                App.trigger('pool:delete', pool, redirect);

                expect(pool.destroy).toHaveBeenCalled();
                expect(App.trigger).not.toHaveBeenCalledWith(redirect);

                redirect = 'home';

                App.trigger('pool:delete', pool, redirect);

                expect(pool.destroy).toHaveBeenCalled();
                expect(App.trigger).toHaveBeenCalledWith(redirect);
            });
        });
    });
});