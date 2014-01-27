define(['app',
        'app/entities/task',
        'app/entities/project'],
function (App, Entities) {
    return describe('Task :: Entities', function () {

        var task = null,
            tasks = null;

        beforeEach(function () {
            task = new Entities.Task({ id: 22 });
            tasks = new Entities.TaskCollection([ task ]);
        });

        describe('Model', function () {
            it('must have a urlRoot that contains \'task\'.', function() {
                expect(Entities.Task.prototype.urlRoot).toContain('task');
            });

            it('must have default attributes.', function () {
                expect(task.get('title')).toBeNull();
                expect(task.get('description')).toBeNull();
                expect(task.get('status')).toBe(1);
                expect(task.get('priority')).toBe(1);
                expect(task.get('startDate')).toBeNull();
                expect(task.get('endDate')).toBeNull();
                expect(task.get('duration')).toBeNull();
                expect(task.get('progress')).toBe(0);
            });

            describe('Validation', function () {
                it('must fail with default attributes.', function () {
                    expect(task.validate(task.attributes)).toBeDefined();
                });

                describe('title', function () {
                    it('must be set', function () {
                        task.set('title', 'Alice');
                        expect(task.validate(task.attributes).title).toBeUndefined();
                    });

                    it('must not be set', function () {
                        task.set('title', '');
                        expect(task.validate(task.attributes).title).toBeDefined();

                        task.set('title', ' ');
                        expect(task.validate(task.attributes).title).toBeDefined();
                    });
                });

                describe('start date', function () {
                    it('may be empty', function() {
                        task.set('startDate', null);
                        expect(task.validate(task.attributes).startDate).toBeUndefined();
                        expect(task.validate(task.attributes).endDate).toBeUndefined();
                    });

                    it('may be empty, even if end date is set', function() {
                        task.set('startDate', null);
                        task.set('endDate', -10);
                        expect(task.validate(task.attributes).startDate).toBeUndefined();
                        expect(task.validate(task.attributes).endDate).toBeUndefined();
                    });

                    it('must be before or equal end date', function() {
                        task.set('startDate', 1);
                        task.set('endDate', 2);
                        expect(task.validate(task.attributes).startDate).toBeUndefined();
                        expect(task.validate(task.attributes).endDate).toBeUndefined();

                        task.set('startDate', 2);
                        task.set('endDate', 2);
                        expect(task.validate(task.attributes).startDate).toBeUndefined();
                        expect(task.validate(task.attributes).endDate).toBeUndefined();
                    });

                    it('must not be after end date', function() {
                        task.set('startDate', 2);
                        task.set('endDate', 1);
                        expect(task.validate(task.attributes).startDate).toBeUndefined();
                        expect(task.validate(task.attributes).endDate).toBeDefined();
                    });
                });

                describe('end date', function() {
                    it('may be empty', function() {
                        task.set('endDate', 2);
                        expect(task.validate(task.attributes).startDate).toBeUndefined();
                        expect(task.validate(task.attributes).endDate).toBeUndefined();
                    });
                });
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
                var response = null;
                var tasks = new Entities.TaskCollection();

                spyOn(Entities.TaskCollection.prototype, 'fetch').andCallFake(function (options) {
                    options.success(tasks);
                });

                runs(function () {
                    $.when(App.request('task:entities')).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response if \'task:entities\' with no parameter', 100);

                runs(function () {
                    expect(response).toBe(tasks);
                });
            });

            it('Should return specified list of subtasks', function () {
                var response = null;
                var task = new Entities.Task({ id: 1 });

                spyOn(Entities.TaskCollection.prototype, 'fetch').andCallFake(function (options) {
                    options.success(task.subtasks);
                });

                runs(function () {
                    $.when(App.request('task:entities', task)).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'task:entities\' with a task that has subtasks as parameter', 100);

                runs(function () {
                    expect(response).toBe(task.subtasks);
                    expect(task.subtasks.url).toMatch('/tasks/1/subtasks');
                });
            });

            it('Should return specified list of project tasks', function () {
                var response = null;
                var project = new Entities.Project({ id: 1 });

                spyOn(Entities.TaskCollection.prototype, 'fetch').andCallFake(function (options) {
                    options.success(project.tasks);
                });

                runs(function () {
                    $.when(App.request('task:entities', project)).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'task:entities\' with a project that has tasks as parameter', 100);

                runs(function () {
                    expect(response).toBe(project.tasks);
                    expect(project.tasks.url).toMatch('/projects/1/tasks');
                });
            });

            it('Should return a new task', function () {
                var response = null;

                runs(function () {
                    $.when(App.request('task:entity')).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'task:entity\' with no parameter', 100);

                runs(function () {
                    expect(response.get('id')).toBe(null);
                });
            });

            it('Should return specified task', function () {
                var response = null;
                var task = new Entities.Task({ id: 1 });

                runs(function () {
                    $.when(App.request('task:entity', task)).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'task:entity\' with specified task as parameter', 100);

                runs(function () {
                    expect(response).toBe(task);
                });
            });

            it('Should return a task with specified id', function () {
                var response = null;
                var id = 1;
                var task = new Entities.Task({ id: id });

                spyOn(Entities.Task.prototype, 'fetch').andCallFake(function (options) {
                    options.success(task);
                });

                runs(function () {
                    $.when(App.request('task:entity', id)).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'task:entity\' with an id as parameter', 100);

                runs(function () {
                    expect(response).toBe(task);
                });
            });
        });
    });
});