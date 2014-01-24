define(['app',
        'app/entities/task',
        'app/entities/project'],
function (App, Entities) {
    return describe('Task :: Entities', function () {

        var task = null,
            tasks = null,
            temp_task_fetch = null,
            temp_tasks_fetch = null;

        beforeEach(function () {
            task = new Entities.Task({ id: 22 });
            tasks = new Entities.TaskCollection([ task ]);

            temp_task_fetch = Entities.Task.prototype.fetch;
            Entities.Task.prototype.fetch = function (options) {
                options.success(task);
            };

            temp_tasks_fetch = Entities.TaskCollection.prototype.fetch;
            Entities.TaskCollection.prototype.fetch = function (options) {
                options.success(tasks);
            };
        });

        afterEach(function () {
            Entities.Task.prototype.fetch = temp_task_fetch;
            Entities.TaskCollection.prototype.fetch = temp_tasks_fetch;
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
                expect(task.validate(task.attributes)).toBeDefined();
            });

            it('The title of a Task Model has to be a string and not empty.', function () {
                task.set('title', 'Example 1');
                expect(task.validate(task.attributes).title).toBeUndefined();

                task.set('title', '2. Example III');
                expect(task.validate(task.attributes).title).toBeUndefined();

                task.set('title', 0);
                expect(task.validate(task.attributes).title).toBeUndefined();

                task.set('title', 1000);
                expect(task.validate(task.attributes).title).toBeUndefined();

                task.set('title', true);
                expect(task.validate(task.attributes).title).toBeUndefined();

                task.set('title', {});
                expect(task.validate(task.attributes).title).toBeDefined();

                task.set('title', []);
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
                expect(task.validate(task.attributes).startDate).toBeUndefined();
                expect(task.validate(task.attributes).endDate).toBeDefined();
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

        describe('API', function () {
            it('Should return specified list of tasks', function () {
                runs(function () {
                    $.when(App.request('task:entities')).done(function (response) {
                        expect(response).toBe(tasks);
                    });
                });
            });

            it('Should return specified list of subtasks', function () {
                runs(function () {
                    var tasks_with_subtasks = new Entities.Task({}, {
                        subtasks: [ {}, {}, {}, {}, {} ]
                    });

                    Entities.TaskCollection.prototype.fetch = function (options) {
                        options.success(tasks_with_subtasks.subtasks);
                    };

                    $.when(App.request('task:entities', tasks_with_subtasks)).done(function (response) {
                        expect(response).toBe(tasks_with_subtasks.subtasks);
                    });
                });
            });

            it('Should return specified list of project tasks', function () {
                runs(function () {
                    var project_with_tasks = new Entities.Project({}, {
                        tasks: [ {}, {}, {}, {} ]
                    });

                    Entities.TaskCollection.prototype.fetch = function (options) {
                        options.success(project_with_tasks.tasks);
                    };

                    $.when(App.request('task:entities', project_with_tasks)).done(function (response) {
                        expect(response.length).toBe(project_with_tasks.tasks.length);
                    });
                });
            });

            it('Should return a new task', function () {
                runs(function () {
                    $.when(App.request('task:entity')).done(function (response) {
                        expect(response.get('id')).toBe(null);
                    });
                });
            });

            it('Should return specified task', function () {
                runs(function () {
                    $.when(App.request('task:entity', task)).done(function (response) {
                        expect(response).toBe(task);
                    });
                });
            });

            it('Should return a task with specified id', function () {
                runs(function () {
                    var id = task.get('id');
                    $.when(App.request('task:entity', id)).done(function (response) {
                        expect(response.get('id')).toBe(id);
                    });
                });
            });
        });
    });
});