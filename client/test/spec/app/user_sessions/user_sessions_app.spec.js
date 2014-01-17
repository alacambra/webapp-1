define(['app', 'app/user_sessions/user_sessions_app', 'app/entities/user_session'], function(App, UserSessionsApp, Entities) {
    describe('UserSession :: App', function() {
        it('Navigate to user_sessions login', function() {
            spyOn(App, 'navigate');

            App.trigger('user_session:login');

            expect(App.navigate).toHaveBeenCalledWith('login');
        });


        it('Navigate to user_sessions logout', function() {
            spyOn(App, 'navigate');

            App.trigger('user_session:logout');

            expect(App.navigate).toHaveBeenCalledWith('logout');
        });
    });
});