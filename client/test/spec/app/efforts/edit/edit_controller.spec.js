define(['app', 'app/entities/effort', 'app/efforts/edit/edit_controller'], function(App, Entities, Ctrl) {
    return describe('Effort :: Edit :: Controller', function() {
        var temp = null;

        beforeEach(function() {
            temp = App.request;

            App.request = function(event_type, effort_id) {
                return new Entities.Effort({
                    id: effort_id
                });
            }
        });

        afterEach(function() {
            App.request = temp;
        });

        it('Should call show in main region', function() {
            spyOn(App.main_region, 'show');

            Ctrl.effort_edit(5);

            expect(App.main_region.show).toHaveBeenCalled();
        })
    });
});