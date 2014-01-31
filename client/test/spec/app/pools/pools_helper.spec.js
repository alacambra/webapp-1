define(['app/pools/pools_helper'], function(pools_helper) {
    return describe('Pool :: Helper', function() {
        var form;

        it('must format date correctly', function() {
            expect(pools_helper.format_date(1387062000)).toEqual('2013-12-15');
        });


        it('must return correct country text', function() {
            expect(pools_helper.country_text()).toEqual('');
            expect(pools_helper.country_text(null)).toEqual('');
            expect(pools_helper.country_text(1)).toEqual('Germany');
            expect(pools_helper.country_text(3)).toEqual('Austria');
        });


        it('must return correct employee count', function() {
            expect(pools_helper.employee_count_text()).toEqual('');
            expect(pools_helper.employee_count_text(null)).toEqual('');
            expect(pools_helper.employee_count_text(1)).toEqual('1-10');
            expect(pools_helper.employee_count_text(3)).toEqual('51-200');
        });


        describe('must unformat correctly', function() {
            beforeEach(function() {
                form = {
                    country: null,
                    foundingDate: null,
                    employeeCount: null
                };
            });

            it('default values', function() {
                expect(pools_helper.unformat(form)).toEqual({
                    country: 0,
                    foundingDate: null,
                    employeeCount: 0
                });
            });

            it('country', function() {
                form.country = '3';
                expect(pools_helper.unformat(form).country).toEqual(3);
            });

            it('founding date', function() {
                form.foundingDate = '2013-12-15';
                expect(pools_helper.unformat(form).foundingDate).toEqual(1387062000);
            });

            it('employee count', function() {
                form.employeeCount = '3';
                expect(pools_helper.unformat(form).employeeCount).toEqual(3);
            });
        });
    });
});