define(['config',
        'app',
        'app/common/message_view'],
function(CONFIG, App, MessageView) {
    var $sandbox = $('#sandbox');

    describe('Common :: MessageView', function() {
        var view = null;

        beforeEach(function() {
            I18n.locale = CONFIG.i18n.default_locale;

            view = new MessageView();
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
    });
});