define(['app', 'app/services/services_app', 'app/entities/service'], function(App, ServicesApp, Entities) {
    describe('Service :: App', function() {
        it('Navigate to services list', function() {
            spyOn(App, 'navigate');

            App.trigger('services:list');

            expect(App.navigate).toHaveBeenCalledWith('services');
        });

        it('Navigate to new service', function() {
            spyOn(App, 'navigate');

            App.trigger('service:create');

            expect(App.navigate).toHaveBeenCalledWith('services/new');
        });

        it('Navigate to show service', function() {
            var id = 1;

            spyOn(App, 'navigate');

            App.trigger('service:show', id);

            expect(App.navigate).toHaveBeenCalledWith('services/' + id);
        });

        it('Navigate to edit service', function() {
            var id = 1;

            spyOn(App, 'navigate');

            App.trigger('service:edit', id);

            expect(App.navigate).toHaveBeenCalledWith('services/' + id + '/edit');
        });

        it('Confirm to delete service', function() {
            var service = new Entities.Service({
                    id: 1,
                    title: 'Service1'
                }),
                redirect = 'redirect';

            spyOn(window, 'confirm');

            App.trigger('service:delete', service, redirect);

            expect(window.confirm).toHaveBeenCalledWith(jasmine.any(String));
        });

        describe('API', function () {
            it('Should delete a specified service with optional redirect', function () {
                var service = new Entities.Service({ id: 6 });
                var redirect;

                spyOn(window, 'confirm').andReturn(true);
                spyOn(App, 'trigger').andCallThrough();
                spyOn(service, 'destroy');

                App.trigger('service:delete', service, redirect);

                expect(service.destroy).toHaveBeenCalled();
                expect(App.trigger).not.toHaveBeenCalledWith(redirect);

                redirect = 'home';

                App.trigger('service:delete', service, redirect);

                expect(service.destroy).toHaveBeenCalled();
                expect(App.trigger).toHaveBeenCalledWith(redirect);
            });
        });
    });
});