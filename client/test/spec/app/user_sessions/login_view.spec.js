define(['config',
        'app',
        'app/entities/user_session',
        'app/user_sessions/login_view'],
function(CONFIG, App, Entities, Login) {
    var $sandbox = $('#sandbox');

    describe('UserSession :: Login :: View', function() {
        var view = null,
            user_session = new Entities.UserSession();

        beforeEach(function() {
            I18n.locale = CONFIG.i18n.default_locale;

            view = new Login.View({
                model: user_session
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

        _.each(CONFIG.i18n.available_locales, function(locale) {
            it('Must not contain missing translations (' + locale.toUpperCase() + ')', function() {
                I18n.locale = locale;
                expect(find_missing_translation(view.render().$el)).toBeUndefined();
            });
        });

        it('Check the model of the view', function() {
            expect(view.model.get('title')).toBeFalsy();

            view = new Login.View({
                model: new Entities.UserSession({
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