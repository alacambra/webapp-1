define([ 'app/users/user_helper', 'app/entities/user' ], function (user_helper, Entities) {

    return describe('User :: Helper', function () {
        it('Should unformat correctly.', function () {
            var data = {
                birthDate: '2013-12-15'
            };

            expect(user_helper.unformat(data)).toEqual({
                birthDate: 1387062000
            });
        });
    });
});