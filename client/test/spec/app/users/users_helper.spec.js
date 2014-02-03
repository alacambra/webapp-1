define(['app/users/users_helper'], function(users_helper) {
    return describe('User :: Helper', function() {
        it('must format date correctly', function() {
            expect(users_helper.format_date(1387062000)).toBe('2013-12-15');
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
                birthDate: null
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