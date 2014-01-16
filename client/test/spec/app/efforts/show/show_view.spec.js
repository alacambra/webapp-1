define(['app', 'app/entities/effort', 'app/efforts/show/show_view'], function(App, Entities, Show) {
    var $sandbox = $('#sandbox');

    describe('Effort :: Show :: View', function() {
        var view = null,
            effort = new Entities.Effort({
                id: 8,
                task_id: 17
            });

        beforeEach(function() {
            view = new Show.View({
                model: effort
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

        it('This view should be represented by a \'div\' element', function() {
            expect(view.el.tagName.toLowerCase()).toBe('div');
        });

        it('Check the model of the view', function() {
            expect(view.model.get('title')).toBeFalsy();

            view = new Show.View({
                model: new Entities.Effort({
                    title: 'test'
                })
            });

            expect(view.model.get('title')).toBe('test');
        });

        it('Check the edit functionality', function() {
            spyOn(App, 'trigger');

            $sandbox.find('.js-edit').click();

            expect(App.trigger).toHaveBeenCalledWith('effort:edit', effort.task_id, effort.get('id'));
        });

        it('Check the delete functionality', function() {
            spyOn(App, 'trigger');

            $sandbox.find('.js-delete').click();

            expect(App.trigger).toHaveBeenCalledWith('effort:delete', effort.task_id, effort, 'task:show');
        });
    });
});