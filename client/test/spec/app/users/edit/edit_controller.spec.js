define(['app',
        'app/entities/user',
        'app/users/edit/edit_controller',
        'lib/response_handler'],
function(App, Entities, Ctrl, response_handler) {
    return describe('User :: Edit :: Controller', function() {
        it('Should invoke show in main_region two times', function () {
            var user_id = 3;
            var counter = 0;

            spyOn(App, 'request').andCallFake(function (event, uid) {
                var defer = $.Deferred();
                defer.resolve(new Entities.User({ id: uid }), null);
                return defer.promise();
            });

            spyOn(App.main_region, 'show').andCallFake(function () {
                counter++;
            });

            Ctrl.user_edit(user_id);

            expect(counter).toBe(2);
        });

        it('Should invoke response_handler when user request fails', function () {
            var response = 'failure';

            spyOn(App, 'request').andCallFake(function (event, uid) {
                var defer = $.Deferred();
                defer.resolve(null, response);
                return defer.promise();
            });

            spyOn(response_handler, 'handle');

            Ctrl.user_edit();

            expect(response_handler.handle).toHaveBeenCalledWith(response);
        });
    });
});
