define(['app',
        'app/entities/project',
        'app/projects/list/list_controller',
        'lib/response_handler'],
function (App, Entities, Ctrl, response_handler) {
    return describe('Project :: List :: Controller', function () {
        it('Should invoke show in main_region two times', function () {
            var counter = 0;

            spyOn(App, 'request').andCallFake(function (event) {
                var defer = $.Deferred();
                defer.resolve(new Entities.ProjectCollection([ { id: 1 }, { id: 2 }, { id: 3 } ]));
                return defer.promise();
            });

            spyOn(App.main_region, 'show').andCallFake(function () {
                counter++;
            });

            Ctrl.projects_list();

            // LoadingView +1
            // Project List_View +1
            expect(counter).toBe(2);
        });

        it('Should invoke response_handler when project request fails', function () {
            var response = 'failure';

            spyOn(App, 'request').andCallFake(function (event) {
                var defer = $.Deferred();
                defer.resolve(undefined, response);
                return defer.promise();
            });

            spyOn(response_handler, 'handle');

            Ctrl.projects_list();

            expect(response_handler.handle).toHaveBeenCalledWith(response);
        });
    });
});