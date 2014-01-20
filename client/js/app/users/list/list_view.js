define(['app',
        'tpl!app/users/list/templates/list.tpl',
        'tpl!app/users/list/templates/list_item.tpl',
        'app/common/empty_view',
        'app/app_helper',
        'app/users/users_helper'],
function(App, list_tpl, list_item_tpl, EmptyView, app_helper, users_helper) {
    App.module('Users.List', function(List, App, Backbone, Marionette, $, _) {
        List.View = Marionette.ItemView.extend({
            className: 'list-row',
            template: list_item_tpl,


            events: {
                'click .js-show': 'show',
                'click .js-edit': 'edit',
                'click .js-delete': 'delete_item'
            },


            templateHelpers: $.extend({}, app_helper, users_helper),


            show: function(event) {
                event.preventDefault();
                App.trigger('user:show', this.model.get('id'));
            },


            edit: function(event) {
                event.preventDefault();
                App.trigger('user:edit', this.model.get('id'));
            },


            delete_item: function(event) {
                event.preventDefault();
                App.trigger('user:delete', this.model);
            }
        });


        List.Users = Marionette.CompositeView.extend({
            id: 'users',
            template: list_tpl,
            templateHelpers: app_helper,
            itemView: List.View,
            itemViewContainer: '#js-user-list-items',
            emptyView: EmptyView,

            events: {
                'click .js-create': function(event) {
                    event.preventDefault();
                    App.trigger('user:new');
                },
                'click a.js-home': 'go_to_home'
            },


            go_to_home: function (event) {
                event.preventDefault();
                App.trigger('home');
            }
        })
    });

    return App.Users.List;
});
