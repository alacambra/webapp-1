define(['app',
        'tpl!app/projects/show/templates/show.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/projects/project_helper',
        'lib/vendor/textile'],
function(App, show_tpl, app_helper, view_helper, project_helper) {
    App.module('Projects.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.ItemView.extend({
            template: show_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, project_helper),


            events: {
                'click a[data-navigate]': App.handle_link,
                'click .js-delete': 'delete_item'
            },


            delete_item: function() {
                App.trigger('project:delete', this.model, 'projects:list');
            }
        });
    });

    return App.Projects.Show;
});
