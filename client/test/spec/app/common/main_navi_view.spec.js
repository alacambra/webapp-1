define(['config',
        'app',
        'app/common/main_navi_view'],
function(CONFIG, App, MainNaviView) {
    var $sandbox = $('#sandbox');

    describe('Common :: MainNaviView', function() {
        var view = null;

        beforeEach(function() {
            I18n.locale = CONFIG.i18n.default_locale;

            view = new MainNaviView({
                available_locales: CONFIG.available_locales
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

        it('Must not contain missing translations', function() {
            expect(find_missing_translation(view.render().$el)).toBeUndefined();
        });
    });
});