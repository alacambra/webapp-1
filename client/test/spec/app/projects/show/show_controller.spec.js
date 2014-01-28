define(['app',
        'app/entities/project',
        'app/projects/show/show_controller',
        'lib/response_handler'],
function(App, Entities, Ctrl, response_handler) {
    return describe('Project :: Show :: Controller', function() {
        it('Should invoke show in main_region two times', function () {
            var project_id = 18;
            var counter = 0;

            spyOn(App, 'request').andCallFake(function (event, pid) {
                var defer = $.Deferred();
                defer.resolve(new Entities.Project({ id: pid }));
                return defer.promise();
            });

            spyOn(App.main_region, 'show').andCallFake(function () {
                counter++;
            });

            Ctrl.project_show(project_id);

            // LoadingView +1
            // Project Show_View +1
            expect(counter).toBe(2);
        });

        it('Should invoked response_handler when project request fails', function () {
            var response = 'failure';

            spyOn(App, 'request').andCallFake(function (event, pid) {
                var defer = $.Deferred();
                defer.resolve(undefined, response);
                return defer.promise();
            });

            spyOn(response_handler, 'handle');

            Ctrl.project_show();

            expect(response_handler.handle).toHaveBeenCalledWith(response);
        });
    });
});