define(['app',
        'tpl!app/users/show/templates/show.tpl',
        'app/app_helper',
        'app/users/users_helper',
        'lib/vendor/textile'],
function(App, show_tpl, app_helper, users_helper) {
    App.module('Users.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.ItemView.extend({
            template: show_tpl,


            events: {
                'click .js-edit': 'edit',
                'click .js-delete': 'delete_item',
                'click a.js-home': 'go_to_home',
                'click a.js-users': 'go_to_users'
            },


            templateHelpers: $.extend({}, app_helper, users_helper),


            edit: function(event) {
                event.preventDefault();
                App.trigger('user:edit', this.model.get('id'));
            },


            delete_item: function() {
                App.trigger('user:delete', this.model, 'users:list');
            },


            go_to_home: function (event) {
                event.preventDefault();
                App.trigger('home');
            },

            go_to_users: function (event) {
                event.preventDefault();
                App.trigger('users:list');
            }
        });
    });

    return App.Users.Show;
});
