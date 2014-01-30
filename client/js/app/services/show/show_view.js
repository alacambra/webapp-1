define(['app',
        'tpl!app/services/show/templates/show.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/services/services_helper',
        'lib/vendor/textile'],
function(App, show_tpl, app_helper, view_helper, services_helper) {
    App.module('Services.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.ItemView.extend({
            template: show_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, services_helper),


            events: {
                'click a[data-navigate]': App.handle_link,
                'click .js-delete-service': 'delete_item'
            },
            

            edit: function(event) {
                event.preventDefault();
                App.trigger('service:edit', this.model.get('id'));
            },


            delete_item: function() {
                App.trigger('service:delete', this.model, 'services:list');
            }
        });
    });

    return App.Services.Show;
});
