define(['app', 'app/entities/effort', 'app/efforts/show/show_controller'], function(App, Entities, Ctrl) {
    return describe('Effort :: Show :: Controller', function() {
        var temp = null;

        beforeEach(function() {
            temp = App.request;

            App.request = function(event_type, effort_id) {
                return new Entities.Effort({
                    id: effort_id
                }, {
                    task_id: 10
                });
            }
        });

        afterEach(function() {
            App.request = temp;
        });

        it('Should call show in main region.', function() {
            spyOn(App.main_region, 'show');

            Ctrl.effort_show(6);

            expect(App.main_region.show).toHaveBeenCalled();
        });
    });
});