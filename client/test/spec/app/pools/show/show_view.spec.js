define(['config',
        'app',
        'app/entities/pool',
        'app/pools/show/show_view'],
function(CONFIG, App, Entities, Show) {
    var $sandbox = $('#sandbox');

    describe('Pool :: Show :: View', function() {
        var view = null,
            pool = new Entities.Pool({
                id: 8
            });

        beforeEach(function() {
            I18n.locale = CONFIG.i18n.default_locale;

            view = new Show.View({
                model: pool
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

        it('Check the model of the view', function() {
            expect(view.model.get('title')).toBeFalsy();

            view = new Show.View({
                model: new Entities.Pool({
                    title: 'test'
                })
            });

            expect(view.model.get('title')).toBe('test');
        });

        it('Check the edit functionality', function() {
            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="pool:edit,' + pool.get('id') + '"]').click();

            expect(App.trigger).toHaveBeenCalledWith('pool:edit', pool.get('id') + '');
        });

        it('Check the delete functionality', function() {
            spyOn(App, 'trigger');

            $sandbox.find('.js-delete-pool').click();

            expect(App.trigger).toHaveBeenCalledWith('pool:delete', pool, 'pools:list');
        });
    });
});