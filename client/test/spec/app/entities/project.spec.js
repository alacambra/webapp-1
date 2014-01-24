define(['app',
        'app/entities/project'],
function(App, Entities) {
    return describe('Project :: Entities', function() {
        var project = null,
            projects = null,
            temp_project_fetch = null,
            temp_projects_fetch = null;

        beforeEach(function() {
            project = new Entities.Project({ id: 2 });
            projects = new Entities.ProjectCollection();

            temp_project_fetch = Entities.Project.prototype.fetch;
            Entities.Project.prototype.fetch = function (options) {
                options.success(project, null);
            };

            temp_projects_fetch = Entities.ProjectCollection.prototype.fetch;
            Entities.ProjectCollection.prototype.fetch = function (options) {
                options.success(projects, null);
            }
        });

        afterEach(function () {
            Entities.Project.prototype.fetch = temp_project_fetch;
            Entities.ProjectCollection.prototype.fetch = temp_projects_fetch;
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
                            project.set('startDate', 0);
                            expect(project.validate(project.attributes).startDate).toBeUndefined();
                            expect(project.validate(project.attributes).endDate).toBeUndefined();
                        });

                        it('may be empty, even if end date is set', function() {
                            project.set('startDate', 0);
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
        });

        describe('Collection', function() {
            it('must have a url that contains "project"', function() {
                expect(Entities.ProjectCollection.prototype.url).toContain('project');
            });
        });

        describe('API', function () {
            it('Should return specified list of projects', function () {
                runs(function () {
                    $.when(App.request('project:entities')).done(function (response) {
                        expect(response).toBe(projects);
                    });
                });
            });

            it('Should return a new project', function () {
                runs(function () {
                    $.when(App.request('project:entity')).done(function (response) {
                        expect(response.get('id')).toBe(null);
                    });
                });
            });

            it('Should return specified project', function () {
                runs(function () {
                    $.when(App.request('project:entity', project)).done(function (response) {
                        expect(response).toBe(project);
                    });
                });
            });

            it('Should return project with specified project id', function () {
                runs(function () {
                    var id = project.get('id');
                    $.when(App.request('project:entity', id)).done(function (response) {
                        expect(response.get('id')).toBe(id);
                    });
                });
            });
        });
    });
});