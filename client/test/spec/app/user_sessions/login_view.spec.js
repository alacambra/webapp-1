define(['app', 'app/entities/user_session', 'app/user_sessions/login_view'], function(App, Entities, Login) {
    var $sandbox = $('#sandbox');

    describe('UserSession :: Login :: View', function() {

        var view = null,
            user_session = new Entities.UserSession();

        beforeEach(function() {
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

        it('The view should be represented by a \'div\' element', function() {
            expect(view.el.tagName.toLowerCase()).toBe('div');
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