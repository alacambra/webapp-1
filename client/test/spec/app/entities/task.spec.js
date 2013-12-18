define([ 'app/entities/task' ], function (Entities) {

    return describe('Task :: Entities', function () {

        var task = null,
            tasks = null;

        beforeEach(function () {
            task = new Entities.Task();
            tasks = new Entities.TaskCollection();
        });

        describe('Model', function () {
            it('Should have a urlRoot that contains \'task\'.', function() {
                expect(Entities.Task.prototype.urlRoot).toContain('task');
            });

            it('Check default attributes.', function () {
                expect(task.get('title')).toBeNull();
                expect(task.get('description')).toBeNull();
                expect(task.get('status')).toBe(1);
                expect(task.get('priority')).toBe(1);
                expect(task.get('startDate')).toBeNull();
                expect(task.get('endDate')).toBeNull();
                expect(task.get('duration')).toBeNull();
                expect(task.get('progress')).toBe(0);
            });

            it('Default Task Model should always return an error object on validate.', function () {
                expect(task.validate(task.attributes)).toBeTruthy();
            });

            it('The title of a Task Model has to be a string and not empty.', function () {
                task.set('title', 'Example 1');
                expect(task.validate(task.attributes).title).toBeUndefined();

                task.set('title', '2. Example III');
                expect(task.validate(task.attributes).title).toBeUndefined();

                task.set('title', 0);
                expect(task.validate(task.attributes).title).toBeDefined();

                task.set('title', 1000);
                expect(task.validate(task.attributes).title).toBeDefined();

                task.set('title', {});
                expect(task.validate(task.attributes).title).toBeDefined();

                task.set('title', []);
                expect(task.validate(task.attributes).title).toBeDefined();

                task.set('title', true);
                expect(task.validate(task.attributes).title).toBeDefined();

                task.set('title', false);
                expect(task.validate(task.attributes).title).toBeDefined();
            });

            it('The start date of a task must be earlier than the end date or equal.', function () {
                task.set('startDate', 1);
                task.set('endDate', 2);
                expect(task.validate(task.attributes).startDate).toBeUndefined();
                expect(task.validate(task.attributes).endDate).toBeUndefined();

                task.set('startDate', 2);
                task.set('endDate', 2);
                expect(task.validate(task.attributes).startDate).toBeUndefined();
                expect(task.validate(task.attributes).endDate).toBeUndefined();

                task.set('startDate', 2);
                task.set('endDate', 1);
                expect(task.validate(task.attributes).startDate).toBeDefined();
                expect(task.validate(task.attributes).endDate).toBeDefined();
            });

            it('The progress should be a value from 0 to 1.', function () {
                task.set('progress', 0);
                expect(task.validate(task.attributes).progress).toBeUndefined();

                task.set('progress', 0.5);
                expect(task.validate(task.attributes).progress).toBeUndefined();

                task.set('progress', 1.00);
                expect(task.validate(task.attributes).progress).toBeUndefined();

                task.set('progress', -0.01);
                expect(task.validate(task.attributes).progress).toBeDefined();

                task.set('progress', 1.01);
                expect(task.validate(task.attributes).progress).toBeDefined();
            });
        });

        describe('Collection', function () {
            it('Should have a url that contains \'task\'.', function() {
                expect(Entities.TaskCollection.prototype.url).toContain('task');
            });

            it('Should order the Collection by the attribute \'priority\'.', function () {
                var priority = -1;

                tasks.add([
                    { priority: 9 },
                    { priority: 2 },
                    { priority: 5 },
                    { priority: 4 },
                    { priority: 7 }
                ]);

                tasks.each(function (t) {
                    expect(priority).toBeLessThan(priority = t.get('priority'));
                });
            });
        });
    });
});