define([ 'app', 'app/entities/project', 'app/projects/edit/edit_controller' ], function (App, Entities, Ctrl) {

    return describe('Project :: Edit :: Controller', function () {

        var temp = null;

        beforeEach(function () {
            temp = App.request;

            App.request = function (event_type, project_id) {
                return new Entities.Project({
                    id: project_id
                });
            }
        });

        afterEach(function () {
            App.request = temp;
        });

        it('Should call show in main region.', function () {
            spyOn(App.main_region, 'show');

            Ctrl.project_edit(5);

            expect(App.main_region.show).toHaveBeenCalled();
        })
    });
});