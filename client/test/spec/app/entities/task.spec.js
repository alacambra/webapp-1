define([ 'app/entities/task' ], function (Entities) {

    return describe('Task :: Entities', function () {

        var task = null,
            tasks = null;

        beforeEach(function () {
            task = new Entities.Task();
            tasks = new Entities.TaskCollection();
        });

        describe('Model', function () {
            it('Check default attributes.', function () {
                expect(task.get('title')).toBeNull();
                expect(task.get('description')).toBeNull();
                expect(task.get('status')).toBeNull();
                expect(task.get('priority')).toBeNull();
                expect(task.get('startDate')).toBeNull();
                expect(task.get('endDate')).toBeNull();
                expect(task.get('duration')).toBeNull();
                expect(task.get('progress')).toBeNull();
            });

            it('Default Task Model should always return an error object on validate.', function () {
                expect(task.validate(task.attributes)).toBeTruthy();
            });

            it('Task Model with non-falsy title shouldn\'t return a title error.', function () {
                task.set('title', 'Example 1');
                expect(task.validate(task.attributes).title).toBeUndefined();

                task.set('title', '2. Example III');
                expect(task.validate(task.attributes).title).toBeUndefined();

                task.set('title', 1404);
                expect(task.validate(task.attributes).title).toBeUndefined();

                task.set('title', {});
                expect(task.validate(task.attributes).title).toBeUndefined();
            });

            it('Task Model with falsy title should always return a title error.', function () {
                task.set('title', '');
                expect(task.validate(task.attributes).title).toBeDefined();

                task.set('title', undefined);
                expect(task.validate(task.attributes).title).toBeDefined();

                task.set('title', null);
                expect(task.validate(task.attributes).title).toBeDefined();

                task.set('title', false);
                expect(task.validate(task.attributes).title).toBeDefined();

                task.set('title', 0);
                expect(task.validate(task.attributes).title).toBeDefined();
            });
        });

        describe('Collection', function () {
            it('This is a empty Collection.', function () {
                expect(tasks.length).toBe(0);
            });

            it('This Collection has one item.', function () {
                tasks.add(task);
                expect(tasks.length).toBe(1);
            });
        });
    });
});