define(['app', 'app/entities/project', 'app/projects/show/show_view'], function(App, Entities, Show) {
    var $sandbox = $('#sandbox');

    describe('Project :: Show :: View', function() {
        var view = null,
            project = new Entities.Project({
                id: 8
            });

        beforeEach(function() {
            view = new Show.View({
                model: project
            });
            $sandbox.html(view.render().$el);
        });

        afterEach(function() {
            view.remove();
            $sandbox.html('');
        });

        it('The render function should always return the view itself', function() {
            expect(view.render()).toBe(view);
        });

        it('This view should be represented by a "div" element', function() {
            expect(view.el.tagName.toLowerCase()).toBe('div');
        });

        it('Check the model of the view', function() {
            expect(view.model.get('title')).toBeFalsy();

            view = new Show.View({
                model: new Entities.Project({
                    title: 'test'
                })
            });

            expect(view.model.get('title')).toBe('test');
        });

        it('Check the edit functionality', function() {
            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="project:edit,' + project.get('id') + '"]').click();

            expect(App.trigger).toHaveBeenCalledWith('project:edit', project.get('id') + '');
        });

        it('Check the delete functionality', function() {
            spyOn(App, 'trigger');

            $sandbox.find('.js-delete').click();

            expect(App.trigger).toHaveBeenCalledWith('project:delete', project, 'projects:list');
        });
    });
});