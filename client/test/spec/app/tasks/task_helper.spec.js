define([ 'app/tasks/tasks_helper', 'app/entities/task' ], function (tasks_helper, Entities) {

    return describe('Task :: Helper', function () {
        it('Date should be returned in the format \'YYYY-MM-DD\'.', function () {
            expect(tasks_helper.format_date(1387206224)).toBe('2013-12-16');
        });

        it('Should return the correct status text.', function () {
            expect(tasks_helper.status_text(1)).toBe('New');
            expect(tasks_helper.status_text(4)).toBe('Completed');
            expect(tasks_helper.status_text(-1)).toBe('');
            expect(tasks_helper.status_text(2.4)).toBe('');
            expect(tasks_helper.status_text('New')).toBe('');
            expect(tasks_helper.status_text(true)).toBe('');
            expect(tasks_helper.status_text(false)).toBe('');
        });

        it('Should return the correct priority text.', function () {
            expect(tasks_helper.priority_text(0)).toBe('Low');
            expect(tasks_helper.priority_text(1)).toBe('Normal');
            expect(tasks_helper.priority_text(2)).toBe('High');
            expect(tasks_helper.priority_text(-1)).toBe('');
            expect(tasks_helper.priority_text(1.2)).toBe('');
            expect(tasks_helper.priority_text('High')).toBe('');
            expect(tasks_helper.priority_text(true)).toBe('');
        });

        it('Should return a correct duration.', function () {
            expect(tasks_helper.format_duration(0)).toBe('');
            expect(tasks_helper.format_duration(2)).toBe('0:02');
            expect(tasks_helper.format_duration(15)).toBe('0:15');
            expect(tasks_helper.format_duration(30)).toBe('0:30');
            expect(tasks_helper.format_duration(60)).toBe('1:00');
            expect(tasks_helper.format_duration(85)).toBe('1:25');
            expect(tasks_helper.format_duration(121)).toBe('2:01');
            expect(tasks_helper.format_duration(610)).toBe('10:10');
        });

        it('Should return a correct progress between 0 and 100.', function () {
            expect(tasks_helper.format_progress(-0.01)).toBe(0);
            expect(tasks_helper.format_progress(-25)).toBe(0);
            expect(tasks_helper.format_progress(0)).toBe(0);
            expect(tasks_helper.format_progress(0.525)).toBe(52);
            expect(tasks_helper.format_progress(0.8)).toBe(80);
            expect(tasks_helper.format_progress(1)).toBe(100);
            expect(tasks_helper.format_progress(1.11111)).toBe(100);
            expect(tasks_helper.format_progress(2)).toBe(100);
        });

        it('Should unformat correctly.', function () {
            var data = {
                status: '3',
                priority: '2',
                startDate: '2013-12-15',
                endDate: '2013-12-16',
                duration: '5:30',
                progress: '85%'
            };

            expect(tasks_helper.unformat(data)).toEqual({
                status: 3,
                priority: 2,
                startDate: 1387062000,
                endDate: 1387148400,
                duration: 330,
                progress: 0.85
            });
        });
    });
});