define(['app',
        'tpl!app/efforts/show/templates/show.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/efforts/efforts_helper',
        'lib/vendor/textile'],
function(App, show_tpl, app_helper, view_helper, efforts_helper) {
    App.module('Efforts.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.ItemView.extend({
            template: show_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, efforts_helper),


            events: {
                'click a[data-navigate]': App.handle_link,
                'click .js-delete': 'delete_item'
            },


            serializeData: function() {
                return _.extend({}, this.model.attributes, {
                    task_id: this.model.task_id
                });
            },


            delete_item: function() {
                App.trigger('effort:delete', this.model.task_id, this.model, 'task:show');
            }
        });
    });

    return App.Efforts.Show;
});
