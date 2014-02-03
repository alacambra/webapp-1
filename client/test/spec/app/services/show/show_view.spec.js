define(['config',
        'app',
        'app/entities/service',
        'app/services/show/show_view'],
function(CONFIG, App, Entities, Show) {
    var $sandbox = $('#sandbox');

    describe('Service :: Show :: View', function() {
        var view = null,
            service = new Entities.Service({
                id: 8
            });

        beforeEach(function() {
            I18n.locale = CONFIG.i18n.default_locale;

            view = new Show.View({
                model: service
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
            expect(view.model.get('name')).toBeFalsy();

            view = new Show.View({
                model: new Entities.Service({
                    name: 'test'
                })
            });

            expect(view.model.get('name')).toBe('test');
        });

        it('Check the edit functionality', function() {
            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="service:edit,' + service.get('id') + '"]').click();

            expect(App.trigger).toHaveBeenCalledWith('service:edit', service.get('id') + '');
        });
    });
});