define(['app', 'app/projects/projects_app', 'app/entities/project'], function(App, ProjectsApp, Entities) {
    describe('Project :: App', function() {
        it('Navigate to projects list', function() {
            spyOn(App, 'navigate');

            App.trigger('projects:list');

            expect(App.navigate).toHaveBeenCalledWith('projects');
        });

        it('Navigate to new project', function() {
            spyOn(App, 'navigate');

            App.trigger('project:create');

            expect(App.navigate).toHaveBeenCalledWith('projects/new');
        });

        it('Navigate to show project', function() {
            var id = 1;

            spyOn(App, 'navigate');

            App.trigger('project:show', id);

            expect(App.navigate).toHaveBeenCalledWith('projects/' + id);
        });

        it('Navigate to edit project', function() {
            var id = 1;

            spyOn(App, 'navigate');

            App.trigger('project:edit', id);

            expect(App.navigate).toHaveBeenCalledWith('projects/' + id + '/edit');
        });

        it('Confirm to delete project', function() {
            var project = new Entities.Project({
                    id: 1,
                    title: 'Project1'
                }),
                redirect = 'redirect';

            spyOn(window, 'confirm');

            App.trigger('project:delete', project, redirect);

            expect(window.confirm).toHaveBeenCalledWith(jasmine.any(String));
        });

        describe('API', function () {
            it('Should delete a specified project with optional redirect', function () {
                var project = new Entities.Project({ id: 7 });
                var redirect;

                spyOn(window, 'confirm').andReturn(true);
                spyOn(App, 'trigger').andCallThrough();
                spyOn(project, 'destroy');

                App.trigger('project:delete', project, redirect);

                expect(project.destroy).toHaveBeenCalled();
                expect(App.trigger).not.toHaveBeenCalledWith(redirect);

                redirect = 'home';

                App.trigger('project:delete', project, redirect);

                expect(project.destroy).toHaveBeenCalled();
                expect(App.trigger).toHaveBeenCalledWith(redirect);
            });
        });
    });
});