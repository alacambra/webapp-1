define(['app', 'app/entities/user', 'app/users/edit/edit_controller'], function(App, Entities, Ctrl) {
    return describe('User :: Edit :: Controller', function() {

        var temp = null;

        beforeEach(function() {
            temp = App.request;

            App.request = function(event_type, user_id) {
                return new Entities.User({
                    id: user_id
                });
            }
        });

        afterEach(function() {
            App.request = temp;
        });

        it('Should call show in main region', function() {
            spyOn(App.main_region, 'show');

            Ctrl.user_edit(5);

            expect(App.main_region.show).toHaveBeenCalled();
        })
    });
});
