define([ 'app/projects/project_helper', 'app/entities/project' ], function (project_helper, Entities) {

    return describe('Project :: Helper', function () {
        it('Date should be returned in the format \'YYYY-MM-DD\'.', function () {
            expect(project_helper.format_date(1387206224)).toBe('2013-12-16');
        });

        it('Should return the correct status text.', function () {
            expect(project_helper.status_text(1)).toBe('New');
            expect(project_helper.status_text(4)).toBe('Completed');
            expect(project_helper.status_text(-1)).toBe('');
            expect(project_helper.status_text(2.4)).toBe('');
            expect(project_helper.status_text('New')).toBe('');
            expect(project_helper.status_text(true)).toBe('');
            expect(project_helper.status_text(false)).toBe('');
        });

        it('Should unformat correctly.', function () {
            var data = {
                status: '3',
                startDate: '2013-12-15',
                endDate: '2013-12-16'
            };

            expect(project_helper.unformat(data)).toEqual({
                status: 3,
                startDate: 1387062000,
                endDate: 1387148400
            });
        });
    });
});