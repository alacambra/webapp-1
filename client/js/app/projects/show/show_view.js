define(['app',
        'tpl!app/projects/show/templates/show.tpl',
        'app/app_helper',
        'app/projects/project_helper',
        'lib/vendor/textile'],
function(App, show_tpl, app_helper, project_helper) {
    App.module('Projects.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.ItemView.extend({
            template: show_tpl,


            events: {
                'click .js-edit': 'edit',
                'click .js-delete': 'delete_item'
            },


            templateHelpers: $.extend({}, app_helper, project_helper),


            edit: function(event) {
                event.preventDefault();
                event.stopPropagation();
                App.trigger('project:edit', this.model.get('id'));
            },


            delete_item: function() {
                App.trigger('project:delete', this.model, 'projects:list');
            }
        });
    });

    return App.Projects.Show;
});
