define(['app',
        'tpl!app/pools/show/templates/show.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/pools/pools_helper',
        'lib/vendor/textile'],
function(App, show_tpl, app_helper, view_helper, pools_helper) {
    App.module('Pools.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.ItemView.extend({
            template: show_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, pools_helper),


            events: {
                'click a[data-navigate]': App.handle_link,
                'click .js-delete-pool': 'delete_item'
            },
            

            edit: function(event) {
                event.preventDefault();
                App.trigger('pool:edit', this.model.get('id'));
            },


            delete_item: function() {
                App.trigger('pool:delete', this.model, 'pools:list');
            }
        });
    });

    return App.Pools.Show;
});
