define(['app/app_helper'], function (app_helper) {
    return describe('App :: Helper', function () {
        describe('url_for', function () {
            it('should generate backbone history URLs', function () {
                expect(app_helper.url_for('tasks')).toBe('#tasks');
                expect(app_helper.url_for('tasks', 1)).toBe('#tasks/1');
                expect(app_helper.url_for('tasks', 23)).toBe('#tasks/23');
                expect(app_helper.url_for('tasks', 'new')).toBe('#tasks/new');
                expect(app_helper.url_for('tasks', 'edit', 23)).toBe('#tasks/23/edit');

                expect(app_helper.url_for('tasks', 23, 'efforts')).toBe('#tasks/23/efforts');
                expect(app_helper.url_for('tasks', 23, 'efforts', 'new')).toBe('#tasks/23/efforts/new');
            });
        });

        it('Text should be truncated correctly', function () {
            expect(app_helper.truncate('house', 9)).toBe('house');
            expect(app_helper.truncate('house', 5)).toBe('house');
            expect(app_helper.truncate('house', 4)).toBe('ho …');
            expect(app_helper.truncate('house of the rising sun', 16, ' [...]')).toBe('house of t [...]');
        });

        describe('build_url', function () {
            it('should generate history URLs', function () {
                expect(app_helper.build_url()).toBe('#');
                expect(app_helper.build_url('')).toBe('#');
                expect(app_helper.build_url('tasks')).toBe('#tasks');
                expect(app_helper.build_url('tasks', 10, 'efforts', 5, 'edit')).toBe('#tasks/10/efforts/5/edit');
                expect(app_helper.build_url('a', 'b', 'c', 1, 2, 3, 'd', 4, 'e', 5, 'f', 6)).toBe('#a/b/c/1/2/3/d/4/e/5/f/6');
            });

            it('should log an error message when an argument is undefined', function () {
                var undefined_var;
                spyOn(console, 'error');
                expect(app_helper.build_url('tasks', undefined_var));
                expect(console.error).toHaveBeenCalledWith(jasmine.any(String));
            });
        });
    });
});