define(['app',
        'tpl!app/projects/show/templates/show.tpl',
        'app/app_helper',
        'app/projects/projects_helper',
        'lib/vendor/textile'],
function(App, show_tpl, app_helper, projects_helper) {
    App.module('Projects.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.ItemView.extend({
            template: show_tpl,


            events: {
                'click .js-edit': 'edit',
                'click .js-delete': 'delete_item',
                'click a.js-home': 'go_to_home',
                'click a.js-projects': 'go_to_projects'
            },


            templateHelpers: $.extend({}, app_helper, projects_helper),


            edit: function(event) {
                event.preventDefault();
                App.trigger('project:edit', this.model.get('id'));
            },


            delete_item: function() {
                App.trigger('project:delete', this.model, 'projects:list');
            },


            go_to_home: function (event) {
                event.preventDefault();
                App.trigger('home');
            },


            go_to_projects: function (event) {
                event.preventDefault();
                App.trigger('projects:list');
            }
        });
    });

    return App.Projects.Show;
});
