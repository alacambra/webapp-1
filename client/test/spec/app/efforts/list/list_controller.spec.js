define(['app', 'app/entities/effort', 'app/efforts/list/list_controller'], function(App, Entities, Ctrl) {
    return describe('Effort :: List :: Controller', function() {
        var temp = null;

        beforeEach(function() {
            temp = App.request;

            App.request = function(event_type) {
                return new Entities.EffortCollection({ task_id: 23 });
            }
        });

        afterEach(function() {
            App.request = temp;
        });

        it('Should call show in main region', function() {
            spyOn(App.main_region, 'show');

            Ctrl.efforts_list();

            expect(App.main_region.show).toHaveBeenCalled();
        });
    });
});