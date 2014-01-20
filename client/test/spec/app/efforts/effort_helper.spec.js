define(['app/efforts/efforts_helper', 'app/entities/effort'], function(efforts_helper, Entities) {
    return describe('Effort :: Helper', function() {
        it('Date should be returned in the format \'YYYY-MM-DD\'', function() {
            expect(efforts_helper.format_date(1387206224)).toBe('2013-12-16');
        });

        it('Should unformat correctly', function() {
            var data = {
                task_id: 10,
                date: '2013-12-15',
                time: '1:30',
                comment: 'foo bar'
            };

            expect(efforts_helper.unformat(data)).toEqual({
                task_id: 10,
                date: 1387062000,
                time: 90,
                comment: 'foo bar'
            });
        });

        it('Should generate confirm text with comment', function() {
            var effort = new Entities.Effort({
                task_id: 10,
                date: 1387062000,
                time: 90,
                comment: 'foo bar'
            });

            expect(efforts_helper.confirm_text(effort)).toEqual('foo bar');
        });

        it('Should generate confirm text with date', function() {
            var effort = new Entities.Effort({
                task_id: 10,
                date: 1387062000,
                time: 90
            });

            expect(efforts_helper.confirm_text(effort)).toEqual('2013-12-15, 1:30');
        });
    });
});