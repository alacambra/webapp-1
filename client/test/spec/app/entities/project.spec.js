define([ 'app/entities/project' ], function (Entities) {

    return describe('Project :: Entities', function () {

        var project = null,
            projects = null;

        beforeEach(function () {
            project = new Entities.Project();
            projects = new Entities.ProjectCollection();
        });

        describe('Model', function () {
            it('Should have a urlRoot that contains \'project\'.', function() {
                expect(Entities.Project.prototype.urlRoot).toContain('project');
            });

            it('Check default attributes.', function () {
                expect(project.get('title')).toBeNull();
                expect(project.get('description')).toBeNull();
                expect(project.get('status')).toBe(1);
                expect(project.get('startDate')).toBeNull();
                expect(project.get('endDate')).toBeNull();
            });

            it('Default Project Model should always return an error object on validate.', function () {
                expect(project.validate(project.attributes)).toBeTruthy();
            });

            it('The title of a Project Model has to be a string and not empty.', function () {
                project.set('title', 'Example 1');
                expect(project.validate(project.attributes).title).toBeUndefined();

                project.set('title', '2. Example III');
                expect(project.validate(project.attributes).title).toBeUndefined();

                project.set('title', 0);
                expect(project.validate(project.attributes).title).toBeDefined();

                project.set('title', 1000);
                expect(project.validate(project.attributes).title).toBeDefined();

                project.set('title', {});
                expect(project.validate(project.attributes).title).toBeDefined();

                project.set('title', []);
                expect(project.validate(project.attributes).title).toBeDefined();

                project.set('title', true);
                expect(project.validate(project.attributes).title).toBeDefined();

                project.set('title', false);
                expect(project.validate(project.attributes).title).toBeDefined();
            });

            it('The start date of a project must be earlier than the end date or equal.', function () {
                project.set('startDate', 1);
                project.set('endDate', 2);
                expect(project.validate(project.attributes).startDate).toBeUndefined();
                expect(project.validate(project.attributes).endDate).toBeUndefined();

                project.set('startDate', 2);
                project.set('endDate', 2);
                expect(project.validate(project.attributes).startDate).toBeUndefined();
                expect(project.validate(project.attributes).endDate).toBeUndefined();

                project.set('startDate', 2);
                project.set('endDate', 1);
                expect(project.validate(project.attributes).startDate).toBeDefined();
                expect(project.validate(project.attributes).endDate).toBeDefined();
            });
        });

        describe('Collection', function () {
            it('Should have a url that contains \'project\'.', function() {
                expect(Entities.ProjectCollection.prototype.url).toContain('project');
            });
        });
    });
});