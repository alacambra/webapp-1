define(['app/app_helper'], function (app_helper) {
    return describe('App :: Helper', function () {
        it('Text should be truncated correctly', function () {
            expect(app_helper.truncate('house', 9)).toBe('house');
            expect(app_helper.truncate('house', 5)).toBe('house');
            expect(app_helper.truncate('house', 4)).toBe('ho …');
            expect(app_helper.truncate('house of the rising sun', 16, ' [...]')).toBe('house of t [...]');
        });
    });
});