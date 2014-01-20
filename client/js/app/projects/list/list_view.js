define(['app',
        'tpl!app/projects/list/templates/list.tpl',
        'tpl!app/projects/list/templates/list_item.tpl',
        'app/app_helper',
        'app/projects/projects_helper'],
function(App, list_tpl, list_item_tpl, app_helper, projects_helper) {
    App.module('Projects.List', function(List, App, Backbone, Marionette, $, _) {
        List.View = Marionette.ItemView.extend({
            className: 'list-row',
            template: list_item_tpl,


            events: {
                'click .js-show': 'show',
                'click .js-edit': 'edit',
                'click .js-delete': 'delete_item'
            },


            templateHelpers: $.extend({}, app_helper, projects_helper),


            show: function(event) {
                event.preventDefault();
                App.trigger('project:show', this.model.get('id'));
            },


            edit: function(event) {
                event.preventDefault();
                App.trigger('project:edit', this.model.get('id'));
            },


            delete_item: function(event) {
                event.preventDefault();
                App.trigger('project:delete', this.model);
            }
        });


        List.Projects = Marionette.CompositeView.extend({
            id: 'projects',
            template: list_tpl,
            templateHelpers: app_helper,
            itemView: List.View,
            itemViewContainer: '#js-project-list-items',

            events: {
                'click .js-create': function(event) {
                    event.preventDefault();
                    App.trigger('project:new');
                },
                'click a.js-home': 'go_to_home'
            },


            go_to_home: function (event) {
                event.preventDefault();
                App.trigger('home');
            }
        })
    });

    return App.Projects.List;
});
