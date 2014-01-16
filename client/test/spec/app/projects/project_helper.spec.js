define(['app/projects/project_helper', 'app/entities/project'], function(project_helper, Entities) {
    return describe('Project :: Helper', function() {
        beforeEach(function() {
            I18n.locale = 'en';
        });


        it('must format date correctly', function() {
            I18n.locale = 'en';
            expect(project_helper.format_date(1387062000)).toEqual('2013-12-15');

            I18n.locale = 'de';
            expect(project_helper.format_date(1387062000)).toEqual('15.12.2013');
        });


        it('must return the correct status text', function() {
            expect(project_helper.status_text(1)).toBe('New');
            expect(project_helper.status_text(4)).toBe('Completed');
            expect(project_helper.status_text(-1)).toBe('');
            expect(project_helper.status_text(2.4)).toBe('');
            expect(project_helper.status_text('')).toBe('');
        });


        it('must unformat correctly', function() {
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