define(['app/model_helper'], function(model_helper) {
    return describe('App :: ModelHelper', function () {
        describe('disabled_fields', function () {
            it('must extract disabled fields', function () {
                expect(model_helper.disabled_fields({ startDateIsDefault: false })).toEqual(['startDate']);
                expect(model_helper.disabled_fields({ foo: 'bar', startDateIsDefault: false })).toEqual(['startDate']);
                expect(model_helper.disabled_fields({ foo: 'bar', startDateIsDefault: true, endDateIsDefault: false })).toEqual(['endDate']);
            });

            it('must extract multiple disabled fields', function () {
                disabled_fields = model_helper.disabled_fields({ foo: 'bar', startDateIsDefault: false, endDateIsDefault: false });
                expect(disabled_fields).toContain('startDate');
                expect(disabled_fields).toContain('endDate');
            });

            it('must skip non-disabled fields', function () {
                expect(model_helper.disabled_fields({ startDateIsDefault: true })).toEqual([]);
                expect(model_helper.disabled_fields({ foo: 'bar', startDateIsDefault: true, endDateIsDefault: true })).toEqual([]);
                expect(model_helper.disabled_fields({ foo: 'bar' })).toEqual([]);
            });
        });
    });
});