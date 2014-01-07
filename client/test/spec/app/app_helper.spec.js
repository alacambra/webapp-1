define(['app/app_helper'], function (app_helper) {
    return describe('App :: Helper', function () {
        describe('url_for', function () {
            it('should generate restful URLs', function () {
                expect(app_helper.url_for('tasks')).toBe('#tasks');
                expect(app_helper.url_for('tasks', 1)).toBe('#tasks/1');
                expect(app_helper.url_for('tasks', 23)).toBe('#tasks/23');
                expect(app_helper.url_for('tasks', 'new')).toBe('#tasks/new');
                expect(app_helper.url_for('tasks', 'edit', 23)).toBe('#tasks/23/edit');
            });
        });

        it('Text should be truncated correctly', function () {
            expect(app_helper.truncate('house', 9)).toBe('house');
            expect(app_helper.truncate('house', 5)).toBe('house');
            expect(app_helper.truncate('house', 4)).toBe('ho …');
            expect(app_helper.truncate('house of the rising sun', 16, ' [...]')).toBe('house of t [...]');
        });
    });
});