define(['app',
        'tpl!app/projects/list/templates/list.tpl',
        'tpl!app/projects/list/templates/list_item.tpl',
        'app/common/empty_view',
        'app/app_helper',
        'app/view_helper',
        'app/projects/projects_helper'],
function(App, list_tpl, list_item_tpl, EmptyView, app_helper, view_helper, projects_helper) {
    App.module('Projects.List', function(List, App, Backbone, Marionette, $, _) {
        List.View = Marionette.ItemView.extend({
            className: 'list-row',
            template: list_item_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, projects_helper),


            events: {
                'click a[data-navigate]': App.handle_link,
                'click .js-delete': 'delete_item'
            },


            delete_item: function(event) {
                event.preventDefault();
                App.trigger('project:delete', this.model);
            }
        });


        List.Projects = Marionette.CompositeView.extend({
            id: 'projects',
            template: list_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper),
            itemView: List.View,
            itemViewContainer: '#js-project-list-items',
            emptyView: EmptyView,

            events: {
                'click a[data-navigate]': App.handle_link
            }
        })
    });

    return App.Projects.List;
});
