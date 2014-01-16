define(['app/entities/project'], function(Entities) {
    return describe('Project :: Entities', function() {
        var project = null,
            projects = null;

        beforeEach(function() {
            project = new Entities.Project();
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
    });
});