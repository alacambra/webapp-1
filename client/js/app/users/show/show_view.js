define(['app',
        'tpl!app/users/show/templates/show.tpl',
        'app/app_helper',
        'app/users/user_helper',
        'lib/vendor/textile'],
function(App, show_tpl, app_helper, user_helper) {
    App.module('Users.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.ItemView.extend({
            template: show_tpl,


            events: {
                'click .js-edit': 'edit',
                'click .js-delete': 'delete_item'
            },


            templateHelpers: $.extend({}, app_helper, user_helper),


            edit: function(event) {
                event.preventDefault();
                event.stopPropagation();
                App.trigger('user:edit', this.model.get('id'));
            },


            delete_item: function() {
                App.trigger('user:delete', this.model, 'users:list');
            }
        });
    });

    return App.Users.Show;
});
