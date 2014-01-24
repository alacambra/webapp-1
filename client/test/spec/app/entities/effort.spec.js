define(['app',
        'app/entities/effort'],
function(App, Entities) {
    return describe('Effort :: Entities', function() {

        var effort = null,
            efforts = null,
            temp_effort_fetch = null,
            temp_efforts_fetch = null;

        beforeEach(function() {
            effort = new Entities.Effort({ id: 5 }, { task_id: 10 });
            efforts = new Entities.EffortCollection({ task_id: 23 });

            temp_effort_fetch = Entities.Effort.prototype.fetch;
            Entities.Effort.prototype.fetch = function (options) {
                options.success(effort, null);
            };

            temp_efforts_fetch = Entities.EffortCollection.prototype.fetch;
            Entities.EffortCollection.prototype.fetch = function (options) {
                options.success(efforts, null);
            };
        });

        afterEach(function () {
            Entities.Effort.prototype.fetch = temp_effort_fetch;
            Entities.EffortCollection.prototype.fetch = temp_efforts_fetch;
        });

        describe('Model', function() {
            it('Should have a urlRoot that contains \'tasks\' and \'efforts\'', function() {
                expect(effort.urlRoot()).toContain('tasks');
                expect(effort.urlRoot()).toContain('effort');
            });

            it('Check default attributes', function() {
                expect(effort.task_id).toBeDefined();
                expect(effort.get('date')).toBeNull();
                expect(effort.get('time')).toBeNull();
                expect(effort.get('comment')).toBeNull();
            });

            it('Default Effort Model should always return an error object on validate', function() {
                expect(effort.validate(effort.attributes)).toBeDefined();
            });

            it('The date of has to be an integer and not empty and between +/- 100 years from now', function() {
                effort.set('date', '');
                expect(effort.validate(effort.attributes).date).toBeDefined();

                effort.set('date', 0);
                expect(effort.validate(effort.attributes).date).toBeDefined();

                effort.set('date', -1767229201);
                expect(effort.validate(effort.attributes).date).toBeDefined();

                effort.set('date', 7258118400);
                expect(effort.validate(effort.attributes).date).toBeDefined();


                effort.set('date', 1);
                expect(effort.validate(effort.attributes).date).toBeUndefined();

                effort.set('date', -1);
                expect(effort.validate(effort.attributes).date).toBeUndefined();

                effort.set('date', -1767229200);
                expect(effort.validate(effort.attributes).date).toBeUndefined();

                effort.set('date', 2524608000);
                expect(effort.validate(effort.attributes).date).toBeUndefined();
            });

            it('The time must be an integer', function() {
                effort.set('time', 0);
                expect(effort.validate(effort.attributes).time).toBeDefined();

                effort.set('time', -1);
                expect(effort.validate(effort.attributes).time).toBeDefined();

                effort.set('time', -100);
                expect(effort.validate(effort.attributes).time).toBeDefined();

                effort.set('time', 1);
                expect(effort.validate(effort.attributes).time).toBeUndefined();

                effort.set('time', 120);
                expect(effort.validate(effort.attributes).time).toBeUndefined();

                effort.set('time', 60 * 24 * 365);
                expect(effort.validate(effort.attributes).time).toBeUndefined();

            });
        });

        describe('Collection', function() {
            it('Should have a url that contains \'effort\'', function() {
                expect(efforts.url()).toContain('efforts');
                expect(Entities.EffortCollection.prototype.url()).toContain('efforts');
            });
        });

        describe('API', function () {
            it('Should return a list of efforts', function () {
                runs(function () {
                    $.when(App.request('effort:entities', efforts.task_id)).done(function (response) {
                        expect(response).toBe(efforts);
                    });
                });
            });

            it('Should return a new effort with specified task id', function () {
                runs(function () {
                    $.when(App.request('effort:entity', effort.task_id)).done(function (response) {
                        expect(response.get('id')).toBe(null);
                        expect(response.task_id).toBe(effort.task_id);
                    });
                });
            });

            it('Should return specified effort', function () {
                runs(function () {
                    $.when(App.request('effort:entity', null, effort)).done(function (response) {
                        expect(response).toBe(effort);
                    });
                });
            });

            it('Should return effort with specified id and task id', function (response) {
                runs(function () {
                    $.when(App.request('effort:entity', null, effort.get('id'))).done(function (response) {
                        expect(response.task_id).toBe(effort.task_id);
                        expect(response.get('id')).toBe(effort.get('id'));
                    });
                });
            });
        });
    });
});