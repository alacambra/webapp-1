define(['app',
        'tpl!app/projects/show/templates/show.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/projects/projects_helper',
        'lib/vendor/textile'],
function(App, show_tpl, app_helper, view_helper, projects_helper) {
    App.module('Projects.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.Layout.extend({
            template: show_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, projects_helper),

            regions: {
                project_tasks: '#project_tasks'
            },

            events: {
                'click a[data-navigate]': App.handle_link,
                'click .js-delete-project': 'delete_item'
            },


            delete_item: function() {
                App.trigger('project:delete', this.model, 'projects:list');
            }
        });
    });

    return App.Projects.Show;
});
