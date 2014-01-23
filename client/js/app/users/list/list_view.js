define(['app',
        'tpl!app/users/list/templates/list.tpl',
        'tpl!app/users/list/templates/list_item.tpl',
        'app/common/empty_view',
        'app/app_helper',
        'app/view_helper',
        'app/users/users_helper'],
function(App, list_tpl, list_item_tpl, EmptyView, app_helper, view_helper, users_helper) {
    App.module('Users.List', function(List, App, Backbone, Marionette, $, _) {
        List.ItemView = Marionette.ItemView.extend({
            className: 'list-row',
            template: list_item_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, users_helper),


            events: {
                'click a[data-navigate]': App.handle_link,
                'click .js-delete': 'delete_item'
            },

            
            delete_item: function(event) {
                event.preventDefault();
                App.trigger('user:delete', this.model);
            }
        });


        List.View = Marionette.CompositeView.extend({
            id: 'users',
            template: list_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper),
            itemView: List.ItemView,
            itemViewContainer: '#js-user-list-items',
            emptyView: EmptyView,

            events: {
                'click a[data-navigate]': App.handle_link
            }
        })
    });

    return App.Users.List;
});
