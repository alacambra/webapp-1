define(['app',
        'tpl!app/users/list/templates/list.tpl',
        'tpl!app/users/list/templates/list_item.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/users/user_helper'],
function(App, list_tpl, list_item_tpl, app_helper, view_helper, user_helper) {
    App.module('Users.List', function(List, App, Backbone, Marionette, $, _) {
        List.View = Marionette.ItemView.extend({
            className: 'list-row',
            template: list_item_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, user_helper),


            events: {
                'click a[data-navigate]': App.handle_link,
                'click .js-delete': 'delete_item'
            },

            
            delete_item: function(event) {
                event.preventDefault();
                App.trigger('user:delete', this.model);
            }
        });


        List.Users = Marionette.CompositeView.extend({
            id: 'users',
            template: list_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper),
            itemView: List.View,
            itemViewContainer: '#js-user-list-items',

            events: {
                'click a[data-navigate]': App.handle_link
            }
        })
    });

    return App.Users.List;
});
