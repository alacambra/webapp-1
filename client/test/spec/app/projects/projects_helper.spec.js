define(['app/projects/projects_helper'], function(projects_helper) {
    return describe('Project :: Helper', function() {
        beforeEach(function() {
            I18n.locale = 'en';
        });


        it('must format date correctly', function() {
            I18n.locale = 'en';
            expect(projects_helper.format_date(1387062000)).toEqual('2013-12-15');

            I18n.locale = 'de';
            expect(projects_helper.format_date(1387062000)).toEqual('15.12.2013');
        });


        it('must return the correct status text', function() {
            expect(projects_helper.status_text(1)).toBe('New');
            expect(projects_helper.status_text(4)).toBe('Completed');
            expect(projects_helper.status_text(-1)).toBe('');
            expect(projects_helper.status_text(2.4)).toBe('');
            expect(projects_helper.status_text('')).toBe('');
        });


        it('must unformat correctly', function() {
            var data = {
                status: '3',
                startDate: '2013-12-15',
                endDate: '2013-12-16'
            };

            expect(projects_helper.unformat(data)).toEqual({
                status: 3,
                startDate: 1387062000,
                endDate: 1387148400
            });
        });
    });
});