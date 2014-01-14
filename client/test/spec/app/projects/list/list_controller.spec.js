define([ 'app', 'app/entities/project', 'app/projects/list/list_controller' ], function (App, Entities, Ctrl) {

    return describe('Project :: List :: Controller', function () {

        var temp = null;

        beforeEach(function () {
            temp = App.request;

            App.request = function (event_type) {
                return new Entities.ProjectCollection();
            }
        });

        afterEach(function () {
            App.request = temp;
        });

        it('Should call show in main region.', function () {
            spyOn(App.main_region, 'show');

            Ctrl.projects_list();

            expect(App.main_region.show).toHaveBeenCalled();
        });
    });
});