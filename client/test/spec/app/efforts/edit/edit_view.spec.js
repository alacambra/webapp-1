define(['app', 'app/entities/effort', 'app/efforts/edit/edit_view'], function(App, Entities, Edit) {
    var $sandbox = $('#sandbox');

    describe('Effort :: Edit :: View', function() {
        var view = null,
            effort = new Entities.Effort({
                task_id: 10,
                id: 8
            });

        beforeEach(function() {
            view = new Edit.View({
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

        it('The view should be represented by a \'div\' element', function() {
            expect(view.el.tagName.toLowerCase()).toBe('div');
        });

        it('Check the model of the view', function() {
            expect(view.model.get('title')).toBeFalsy();

            view = new Edit.View({
                model: new Entities.Effort({
                    task_id: 10,
                    title: 'test'
                })
            });

            expect(view.model.get('title')).toBe('test');
        });

        it('Check the submit functionality', function() {
            spyOn(view, 'trigger');

            $sandbox.find('button.js-submit').click();

            expect(view.trigger).toHaveBeenCalledWith('form:submit', jasmine.any(Object));
        });
    });
});