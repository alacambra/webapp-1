define([ 'app/tasks/task_helper', 'app/entities/task' ], function (task_helper, Entities) {

    return describe('Task Helper', function () {
        it('Date should be returned in the format \'DD.MM.YYYY\'.', function () {
            expect(task_helper.format_date(1387206224)).toBe('16.12.2013');
        });

        it('Should return the correct status text.', function () {
            expect(task_helper.status_text(0)).toBe('');
            expect(task_helper.status_text(2)).toBe('New');
            expect(task_helper.status_text(5)).toBe('Completed');
            expect(task_helper.status_text(-1)).toBe('');
            expect(task_helper.status_text(2.4)).toBe('');
            expect(task_helper.status_text('New')).toBe('');
            expect(task_helper.status_text(true)).toBe('');
            expect(task_helper.status_text(false)).toBe('');
        });

        it('Should return the correct priority text.', function () {
            expect(task_helper.priority_text(0)).toBe('');
            expect(task_helper.priority_text(1)).toBe('Low');
            expect(task_helper.priority_text(2)).toBe('Normal');
            expect(task_helper.priority_text(3)).toBe('High');
            expect(task_helper.priority_text(-1)).toBe('');
            expect(task_helper.priority_text(1.2)).toBe('');
            expect(task_helper.priority_text('High')).toBe('');
            expect(task_helper.priority_text(true)).toBe('');
        });

        xit('Should return a correct duration.', function () {
            expect(task_helper.format_duration(0)).toBe('0:00');
            expect(task_helper.format_duration(2)).toBe('0:02');
            expect(task_helper.format_duration(15)).toBe('0:15');
            expect(task_helper.format_duration(30)).toBe('0:30');
            expect(task_helper.format_duration(60)).toBe('1:00');
            expect(task_helper.format_duration(85)).toBe('1:25');
            expect(task_helper.format_duration(121)).toBe('2:01');
            expect(task_helper.format_duration(610)).toBe('10:10');
        });

        xit('Should return correct progress.', function () {
            expect(task_helper.format_progress(0)).toBe('0%');
            expect(task_helper.format_progress(0.01)).toBe('1%');
            expect(task_helper.format_progress(0.25)).toBe('25%');
            expect(task_helper.format_progress(0.525)).toBe('52.5%');
            expect(task_helper.format_progress(0.8)).toBe('80%');
            expect(task_helper.format_progress(1)).toBe('100%');
            expect(task_helper.format_progress(1.11111)).toBe('111.111%');
            expect(task_helper.format_progress(2)).toBe('200%');
        });

        it('Should unformat correctly.', function () {
            var data = {
                status: '3',
                priority: '2',
                startDate: '15.12.2013',
                endDate: '16.12.2013',
                duration: '5:30',
                progress: '85%'
            }

            expect(task_helper.unformat(data)).toEqual({
                status: 3,
                priority: 2,
                startDate: 1387062000,
                endDate: 1387148400,
                duration: 330,
                progress: 0.85
            });
        });

        xit('Should return true if it is a value.', function () {
            // TODO: Funktionsweise ist mir nicht ganz klar.
        });
    });
});