define(['app',
        'app/entities/service',
        'app/services/list/list_controller',
        'lib/response_handler'],
function (App, Entities, Ctrl, response_handler) {
    return describe('Service :: List :: Controller', function () {
        it('Should invoke show in main_region two times', function () {
            var counter = 0;

            spyOn(App, 'request').andCallFake(function (event) {
                var defer = $.Deferred();
                defer.resolve(new Entities.ServiceCollection([ { id: 1 }, { id: 2 }, { id: 3 } ]));
                return defer.promise();
            });

            spyOn(App.main_region, 'show').andCallFake(function () {
                counter++;
            });

            Ctrl.services_list();

            // LoadingView +1
            // Service List_View +1
            expect(counter).toBe(2);
        });

        it('Should invoke response_handler when service request fails', function () {
            var response = 'failure';

            spyOn(App, 'request').andCallFake(function (event) {
                var defer = $.Deferred();
                defer.resolve(undefined, response);
                return defer.promise();
            });

            spyOn(response_handler, 'handle');

            Ctrl.services_list();

            expect(response_handler.handle).toHaveBeenCalledWith(response);
        });

        it('Should delete a specified service with optional redirect', function () {
            var service = new Entities.Service({ id: 13 });
            var redirect;

            spyOn(App, 'request').andCallFake(function (event, p) {
                var defer = $.Deferred();
                defer.resolve(p);
                return defer.promise();
            });

            spyOn(service, 'destroy');
            spyOn(App, 'trigger');

            Ctrl.service_delete(service);

            expect(service.destroy).toHaveBeenCalled();
            expect(App.trigger).not.toHaveBeenCalled();

            redirect = 'redirect';

            Ctrl.service_delete(service, redirect);

            expect(App.trigger).toHaveBeenCalledWith(redirect)
        });
    });
});