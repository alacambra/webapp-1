define([ 'app', 'app/entities/user', 'app/users/list/list_controller' ], function (App, Entities, Ctrl) {

    return describe('User :: List :: Controller', function () {

        var temp = null;

        beforeEach(function () {
            temp = App.request;

            App.request = function (event_type) {
                return new Entities.UserCollection();
            }
        });

        afterEach(function () {
            App.request = temp;
        });

        it('Should call show in main region.', function () {
            spyOn(App.main_region, 'show');

            Ctrl.users_list();

            expect(App.main_region.show).toHaveBeenCalled();
        });
    });
});