define(['app', 'app/entities/user_session', 'app/user_sessions/user_sessions_controller'], function(App, Entities, Ctrl) {
    return describe('UserSession :: Edit :: Controller', function() {
        var temp = null;

        beforeEach(function() {
            temp = App.request;

            App.request = function() {
                return new Entities.UserSession();
            }
        });

        afterEach(function() {
            App.request = temp;
        });

        it('Should call show in main region', function() {
            spyOn(App.main_region, 'show');

            Ctrl.login();

            expect(App.main_region.show).toHaveBeenCalled();
        })
    });
});
