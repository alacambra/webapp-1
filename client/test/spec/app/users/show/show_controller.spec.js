define(['app', 'app/entities/user', 'app/users/show/show_controller'], function(App, Entities, Ctrl) {
    return describe('User :: Show :: Controller', function() {

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

            Ctrl.user_show(6);

            expect(App.main_region.show).toHaveBeenCalled();
        });
    });
});