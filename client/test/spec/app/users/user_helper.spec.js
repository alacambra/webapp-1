define(['app/users/users_helper', 'app/entities/user'], function(users_helper, Entities) {
    return describe('User :: Helper', function() {
        beforeEach(function() {
            I18n.locale = 'en';
        });


        it('must format date correctly', function() {
            I18n.locale = 'en';
            expect(users_helper.format_date(1387062000)).toEqual('2013-12-15');

            I18n.locale = 'de';
            expect(users_helper.format_date(1387062000)).toEqual('15.12.2013');
        });


        it('must format full name correctly', function() {
            expect(users_helper.full_name('Alice')).toEqual('Alice');
            expect(users_helper.full_name('Alice', undefined)).toEqual('Alice');
            expect(users_helper.full_name(undefined, 'Riddell')).toEqual('Riddell');
            expect(users_helper.full_name('Alice', 'Riddell')).toEqual('Alice Riddell');
        });


        it('must unformat correctly', function() {
            expect(users_helper.unformat({
                birthDate: '2013-12-15'
            })).toEqual({
                birthDate: 1387062000
            });

            expect(users_helper.unformat({
                birthDate: ''
            })).toEqual({
                birthDate: 0
            });

            expect(users_helper.unformat({
                birthDate: '2013-12-15',
                password: 'test'
            })).toEqual({
                birthDate: 1387062000,
                password: 'test'
            });

            expect(users_helper.unformat({
                birthDate: '2013-12-15',
                password: ''
            })).toEqual({
                birthDate: 1387062000
            });
        });
    });
});