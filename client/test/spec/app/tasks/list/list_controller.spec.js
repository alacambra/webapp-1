define([ 'app', 'app/entities/task', 'app/tasks/list/list_controller' ], function (App, Entities, Ctrl) {

    return describe('Task :: List :: Controller', function () {

        var temp = null;

        beforeEach(function () {
            temp = App.request;

            App.request = function (event_type) {
                return new Entities.TaskCollection();
            }
        });

        afterEach(function () {
            App.request = temp;
        });

        it('Should call show in main region.', function () {
            spyOn(App.main_region, 'show');

            Ctrl.tasks_list();

            expect(App.main_region.show).toHaveBeenCalled();
        });
    });
});