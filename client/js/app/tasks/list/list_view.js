define(['app',
        'tpl!app/tasks/list/templates/list.tpl',
        'tpl!app/tasks/list/templates/list_item.tpl',
        'app/common/empty_view',
        'app/app_helper',
        'app/view_helper',
        'app/tasks/tasks_helper',
        'app/users/users_helper'],
function(App, list_tpl, list_item_tpl, EmptyView, app_helper, view_helper, tasks_helper, users_helper) {
    App.module('Tasks.List', function(List, App, Backbone, Marionette, $, _) {
        List.ItemView = Marionette.ItemView.extend({
            className: 'list-row',
            template: list_item_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, tasks_helper, users_helper),

            initialize: function(options) {
                var default_options = {
                    parent: null,
                    users: null
                };
                _.extend(this.templateHelpers, default_options, options);
            },

            events: {
                'click a[data-navigate]': App.handle_link,
                'click .js-delete-task': 'delete_item'
            },

            delete_item: function(event) {
                event.preventDefault();
                event.stopPropagation();
                App.trigger('task:delete', this.model);
            }
        });


        List.View = Marionette.CompositeView.extend({
            id: 'tasks',
            template: list_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper),
            itemView: List.ItemView,
            itemViewContainer: '#js-task-list-items',
            emptyView: EmptyView,

            events: {
                'click a[data-navigate]': App.handle_link
            },

            initialize: function(options) {
                var default_options = {
                    breadcrumbs: true,
                    title: false,
                    parent: null,
                    parent_id: null
                };

                _.extend(this.templateHelpers, default_options, options);

                this.itemViewOptions = {
                    parent: this.templateHelpers.parent
                }
            }
        });
    });

    return App.Tasks.List;
});
