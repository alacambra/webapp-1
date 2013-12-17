define([ 'app', 'app/entities/task', 'app/tasks/show/show_controller' ], function (App, Entities, Ctrl) {

    return describe('Task :: Show :: Controller', function () {

        var temp = null;

        beforeEach(function () {
            temp = App.request;

            App.request = function (event_type, task_id) {
                return new Entities.Task({
                    id: task_id
                });
            }
        });

        afterEach(function () {
            App.request = temp;
        });

        it('Should call show in main region.', function () {
            spyOn(App.main_region, 'show');

            Ctrl.task_show(6);

            expect(App.main_region.show).toHaveBeenCalled();
        });
    });
});