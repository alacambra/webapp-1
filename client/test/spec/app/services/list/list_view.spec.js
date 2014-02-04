define(['config',
        'app',
        'app/entities/service',
        'app/services/list/list_view',
        'app/app_helper',
        'app/view_helper'],
function(CONFIG, App, Entities, List, app_helper, view_helper) {
    var $sandbox = $('#sandbox');

    describe('Service :: List :: View', function() {
        var listView = null,
            itemView = null,
            service1 = new Entities.Service({
                id: 1
            }),
            service2 = new Entities.Service({
                id: 2
            }),
            services = new Entities.ServiceCollection([
                service1,
                service2
           ]);

        beforeEach(function() {
            I18n.locale = CONFIG.i18n.default_locale;

            listView = new List.View({
                collection: services,
                templateHelpers: _.extend({}, app_helper, view_helper)
            });
            itemView = new List.ItemView({
                model: service1
            });
            $sandbox.html(listView.render().$el);
        });

        afterEach(function() {
            listView.remove();
            itemView.remove();
            $sandbox.html('');
        });

        it('The render function of list should always return the list view itself', function() {
            expect(listView.render()).toBe(listView);
        });

        it('The render function of item should always return the item view itself', function() {
            expect(itemView.render()).toBe(itemView);
        });

        it('This list view should be represented by a "div" element', function() {
            expect(listView.el.tagName.toLowerCase()).toBe('div');
        });

        it('This item view should be represented by a "div" element', function() {
            expect(itemView.el.tagName.toLowerCase()).toBe('div');
        });

        it('Must not contain missing translations', function() {
            expect(find_missing_translation(listView.render().$el)).toBeUndefined();
        });

        it('Check if list view rendered two items', function() {
            expect($sandbox.find('#js-service-list-items .list-row').length).toBe(2);
        });

        it('Check the create functionality of list view', function() {
            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="service:create"]').click();

            expect(App.trigger).toHaveBeenCalledWith('service:create');
        });

        it('Check the show functionality of item view', function() {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="service:show,' + service1.get('id') + '"]').click();

            expect(App.trigger).toHaveBeenCalledWith('service:show', service1.get('id') + '');
        });

        it('Check the edit functionality of item view', function() {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="service:edit,' + service1.get('id') + '"]').click();

            expect(App.trigger).toHaveBeenCalledWith('service:edit', service1.get('id') + '');
        });

        it('Check the delete functionality of item view', function() {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('.js-delete-service').click();

            expect(App.trigger).toHaveBeenCalledWith('service:delete', service1);
        });
    });
});




















