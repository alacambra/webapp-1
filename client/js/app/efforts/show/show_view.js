define(['app',
        'tpl!app/efforts/show/templates/show.tpl',
        'app/app_helper',
        'app/efforts/effort_helper',
        'lib/vendor/textile'],
function(App, show_tpl, app_helper, effort_helper) {
    App.module('Efforts.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.ItemView.extend({
            template: show_tpl,


            events: {
                'click .js-edit': 'edit',
                'click .js-delete': 'delete_item'
            },


            templateHelpers: $.extend({}, app_helper, effort_helper),


            edit: function(event) {
                event.preventDefault();
                event.stopPropagation();
                App.trigger('effort:edit', this.model.get('id'));
            },


            delete_item: function() {
                App.trigger('effort:delete', this.model, 'efforts:list');
            }
        });
    });

    return App.Efforts.Show;
});
