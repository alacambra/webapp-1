define(['app',
        'app/entities/project'],
function(App, Entities) {
    return describe('Project :: Entities', function() {
        var project = null,
            projects = null;

        beforeEach(function() {
            project = new Entities.Project({ id: 2 });
            projects = new Entities.ProjectCollection();
        });

        describe('Model', function() {
            it('must have a urlRoot that contains "project"', function() {
                expect(Entities.Project.prototype.urlRoot).toContain('project');
            });

            it('must have default attributes', function() {
                expect(project.get('title')).toBeNull();
                expect(project.get('description')).toBeNull();
                expect(project.get('status')).toBe(1);
                expect(project.get('startDate')).toBeNull();
                expect(project.get('endDate')).toBeNull();
            });

            describe('Validation', function() {
                it('must fail with default attributes', function() {
                    expect(project.validate(project.attributes)).toBeDefined();
                });

                describe('title', function() {
                    it('must be set', function() {
                        project.set('title', 'Alice');
                        expect(project.validate(project.attributes).title).toBeUndefined();
                    });


                    it('must not be empty', function() {
                        project.set('title', '');
                        expect(project.validate(project.attributes).title).toBeDefined();

                        project.set('title', ' ');
                        expect(project.validate(project.attributes).title).toBeDefined();
                    });
                });

                describe('start date', function() {
                    it('may be empty', function() {
                        project.set('startDate', null);
                        expect(project.validate(project.attributes).startDate).toBeUndefined();
                        expect(project.validate(project.attributes).endDate).toBeUndefined();
                    });

                    it('may be empty, even if end date is set', function() {
                        project.set('startDate', null);
                        project.set('endDate', -10);
                        expect(project.validate(project.attributes).startDate).toBeUndefined();
                        expect(project.validate(project.attributes).endDate).toBeUndefined();
                    });

                    it('must be before or equal end date', function() {
                        project.set('startDate', 1);
                        project.set('endDate', 2);
                        expect(project.validate(project.attributes).startDate).toBeUndefined();
                        expect(project.validate(project.attributes).endDate).toBeUndefined();

                        project.set('startDate', 2);
                        project.set('endDate', 2);
                        expect(project.validate(project.attributes).startDate).toBeUndefined();
                        expect(project.validate(project.attributes).endDate).toBeUndefined();
                    });

                    it('must not be after end date', function() {
                        project.set('startDate', 2);
                        project.set('endDate', 1);
                        expect(project.validate(project.attributes).startDate).toBeUndefined();
                        expect(project.validate(project.attributes).endDate).toBeDefined();
                    });
                });

                describe('end date', function() {
                    it('may be empty', function() {
                        project.set('endDate', 2);
                        expect(project.validate(project.attributes).startDate).toBeUndefined();
                        expect(project.validate(project.attributes).endDate).toBeUndefined();
                    });
                });
            });
        });

        describe('Collection', function() {
            it('must have a url that contains "project"', function() {
                expect(Entities.ProjectCollection.prototype.url).toContain('project');
            });
        });

        describe('API', function () {
            it('Should return specified list of projects', function () {
                var response = null;
                var projects = new Entities.ProjectCollection();

                spyOn(Entities.ProjectCollection.prototype, 'fetch').andCallFake(function (options) {
                    options.success(projects);
                });

                runs(function () {
                    $.when(App.request('project:entities')).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'project:entities\' with no parameter', 100);

                runs(function () {
                    expect(response).toBe(projects);
                });
            });

            it('Should return a new project', function () {
                var response = null;

                runs(function () {
                    $.when(App.request('project:entity')).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'project:entity\' with no parameter', 100);

                runs(function () {
                    expect(response.get('id')).toBe(null);
                });
            });

            it('Should return specified project', function () {
                var response = null;
                var project = new Entities.Project({ id: 1 });

                runs(function () {
                    $.when(App.request('project:entity', project)).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'project:entity\' with specified project as parameter', 100);

                runs(function () {
                    expect(response).toBe(project);
                });
            });

            it('Should return project with specified project id', function () {
                var response = null;
                var id = 1;
                var project = new Entities.Project({ id: id });

                spyOn(Entities.Project.prototype, 'fetch').andCallFake(function (options) {
                    options.success(project);
                });

                runs(function () {
                    $.when(App.request('project:entity', id)).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'project:entity\' with id as parameter', 100);

                runs(function () {
                    expect(response).toBe(project);
                });
            });
        });
    });
});