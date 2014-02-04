define(['config',
        'app',
        'app/common/loading_view'],
function(CONFIG, App, LoadingView) {
    var $sandbox = $('#sandbox');

    describe('Common :: LoadingView', function() {
        var view = null;

        beforeEach(function() {
            I18n.locale = CONFIG.i18n.default_locale;

            view = new LoadingView();
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