define(['app',
        'app/entities/effort'],
function(App, Entities) {
    return describe('Entities :: Effort', function() {
        var effort = null,
            efforts = null;

        beforeEach(function() {
            effort = new Entities.Effort({ id: 5 }, { task_id: 10 });
            efforts = new Entities.EffortCollection({ task_id: 23 });
        });

        describe('Model', function() {
            it('must have a urlRoot that contains \'tasks\' and \'efforts\'', function() {
                expect(effort.urlRoot()).toContain('tasks');
                expect(effort.urlRoot()).toContain('effort');
            });

            it('must have default attributes', function() {
                expect(effort.task_id).toBeDefined();
                expect(effort.get('date') / 100).toBeCloseTo(moment().unix() / 100, 1);
                expect(effort.get('time')).toBeNull();
                expect(effort.get('comment')).toBeNull();
            });

            describe('Validation', function () {
                it('must fail with default attributes', function() {
                    expect(effort.validate(effort.attributes)).toBeDefined();
                });

                describe('date', function () {
                    it('may be empty', function () {
                        effort.set('date', null);
                        expect(effort.validate(effort.attributes).date).toBeUndefined();
                    });
                });

                describe('time', function () {
                    it('must be greater then 0', function () {
                        effort.set('time', 0);
                        expect(effort.validate(effort.attributes).time).toBeDefined();

                        effort.set('time', -1);
                        expect(effort.validate(effort.attributes).time).toBeDefined();

                        effort.set('time', 1);
                        expect(effort.validate(effort.attributes).time).toBeUndefined();
                    });
                });

            });
        });

        describe('Collection', function() {
            it('Should have a url that contains \'effort\'', function() {
                expect(efforts.url()).toContain('efforts');
                expect(Entities.EffortCollection.prototype.url()).toContain('efforts');
            });
        });

        describe('API', function () {
            it('Should return specified list of efforts', function () {
                var response = null;
                var efforts = new Entities.EffortCollection({ task_id: 1 });

                spyOn(Entities.EffortCollection.prototype, 'fetch').andCallFake(function (options) {
                    options.success(efforts);
                });

                runs(function () {
                    $.when(App.request('effort:entities', efforts.task_id)).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'effort:entities\' with no parameter', 100);

                runs(function () {
                    expect(response).toBe(efforts);
                });
            });

            it('Should return a new effort with specified task id', function () {
                var response = null;
                var task_id = 1;

                runs(function () {
                    $.when(App.request('effort:entity', task_id)).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'effort:entity\' with task id as parameter', 100);

                runs(function () {
                    expect(response.get('id')).toBe(null);
                    expect(response.task_id).toBe(task_id);
                });
            });

            it('Should return specified effort', function () {
                var response = null;
                var effort = new Entities.Effort({ id: 1 }, { task_id: 2 });

                spyOn(Entities.Effort.prototype, 'fetch').andCallFake(function (options) {
                    options.success(effort);
                });

                runs(function () {
                    $.when(App.request('effort:entity', null, effort)).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'effort:entity\' with task id is null and effort as parameters', 100);

                runs(function () {
                    expect(response).toBe(effort);
                });
            });

            it('Should return effort with specified id and task id', function () {
                var response = null;
                var effort_id = 1;
                var task_id = 2;
                var effort = new Entities.Effort({ id: effort_id }, { task_id: task_id });

                spyOn(Entities.Effort.prototype, 'fetch').andCallFake(function (options) {
                    options.success(effort);
                });

                runs(function () {
                    $.when(App.request('effort:entity', task_id, effort_id)).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'effort:entity\' with task id is null and id as parameters', 100);

                runs(function () {
                    expect(response).toBe(effort);
                });
            });
        });
    });
});