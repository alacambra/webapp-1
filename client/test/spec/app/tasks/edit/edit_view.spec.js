define(['config',
        'app',
        'app/entities/task',
        'app/tasks/edit/edit_view'],
function(CONFIG, App, Entities, Edit) {
    var $sandbox = $('#sandbox');

    describe('Task :: Edit :: View', function() {

        var view = null,
            task = new Entities.Task({
                id: 8,
                assignee: {
                    id: 2,
                    firstName: 'Charlie',
                    lastName: 'Chaos'
                }
            });

        beforeEach(function() {
            I18n.locale = CONFIG.i18n.default_locale;

            view = new Edit.View({
                model: task
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

        it('The view should be represented by a "div" element', function() {
            expect(view.el.tagName.toLowerCase()).toBe('div');
        });

        it('Must not contain missing translations', function() {
            expect(find_missing_translation(view.render().$el)).toBeUndefined();
        });

        it('Check the model of the view', function() {
            expect(view.model.get('title')).toBeFalsy();

            view = new Edit.View({
                model: new Entities.Task({
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