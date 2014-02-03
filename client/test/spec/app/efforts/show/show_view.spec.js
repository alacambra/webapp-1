define(['config',
        'app',
        'app/entities/effort',
        'app/efforts/show/show_view'],
function(CONFIG, App, Entities, Show) {
    var $sandbox = $('#sandbox');

    describe('Effort :: Show :: View', function() {
        var view = null,
            effort = new Entities.Effort({
                id: 8
            }, {
                task_id: 17
            });

        beforeEach(function() {
            I18n.locale = CONFIG.i18n.default_locale;

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

        it('This view should be represented by a "div" element', function() {
            expect(view.el.tagName.toLowerCase()).toBe('div');
        });

        _.each(CONFIG.i18n.available_locales, function(locale) {
            it('Must not contain missing translations (' + locale.toUpperCase() + ')', function() {
                I18n.locale = locale;
                expect(find_missing_translation(view.render().$el)).toBeUndefined();
            });
        });

        it('Check the model of the view', function() {
            expect(view.model.get('title')).toBeFalsy();

            view = new Show.View({
                model: new Entities.Effort({
                    title: 'test'
                }, {
                    task_id: 10
                })
            });

            expect(view.model.get('title')).toBe('test');
        });

        it('Check the edit functionality', function() {
            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="effort:edit,' + effort.task_id + ',' + effort.get('id') + '"]').click();

            expect(App.trigger).toHaveBeenCalledWith('effort:edit', effort.task_id + '', effort.get('id') + '');
        });

        it('Check the delete functionality', function() {
            spyOn(App, 'trigger');

            $sandbox.find('.js-delete-effort').click();

            expect(App.trigger).toHaveBeenCalledWith('effort:delete', effort.task_id, effort, 'task:show');
        });
    });
});