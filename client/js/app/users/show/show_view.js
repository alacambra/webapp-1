define(['app',
        'tpl!app/users/show/templates/show.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/users/users_helper',
        'lib/vendor/textile'],
function(App, show_tpl, app_helper, view_helper, users_helper) {
    App.module('Users.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.ItemView.extend({
            template: show_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, users_helper),


            events: {
                'click a[data-navigate]': App.handle_link,
                'click .js-delete-user': 'delete_item'
            },
            

            edit: function(event) {
                event.preventDefault();
                App.trigger('user:edit', this.model.get('id'));
            },


            delete_item: function() {
                App.trigger('user:delete', this.model, 'users:list');
            }
        });
    });

    return App.Users.Show;
});
