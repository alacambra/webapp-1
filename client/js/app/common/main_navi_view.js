define(['app',
        'tpl!app/common/templates/main_navi.tpl',
        'app/common/not_found_view',
        'app/app_helper'],
function (App, main_navi_tpl, NotFoundView, app_helper) {
    App.module('Common', function (Common, App, Backbone, Marionette, $, _) {
        Common.MainNaviView = Marionette.ItemView.extend({
            template: main_navi_tpl,


            templateHelpers: app_helper,


            initialize: function(options) {
                this.available_locales = options.available_locales;

                var that = this;
                App.on('main_navi:highlight:item', function(item) {
                    that.highlight_navi($('#js-main-navi-items').find('a[href="#' + item + '"]').parent());
                });

                App.on('main_navi:login', function() {
                    that.ui.login_button.hide();
                    that.ui.logout_button.show();
                });

                App.on('main_navi:logout', function() {
                    that.ui.logout_button.hide();
                    that.ui.login_button.show();
                });
            },


            serializeData: function() {
                return {
                    available_locales: this.available_locales,
                    logged_in: App.logged_in()
                }
            },


            ui: {
                login_button: '#login_button',
                logout_button: '#logout_button'
            },


            events: {
                'click #js-main-navi-items a': 'main_navi_item_clicked',
                'click #js-locale a': 'switch_locale'
            },


            main_navi_item_clicked: function(event) {
                event.preventDefault();

                var item = $(event.target).attr('href').replace('#', '');

                switch(item) {
                    case 'login': App.trigger('user_session:login'); break;
                    case 'logout': App.trigger('user_session:logout'); break;
                    case 'projects': App.trigger('projects:list'); break;
                    case 'tasks': App.trigger('tasks:list'); break;
                    case 'users': App.trigger('users:list'); break;
                    default:
                        App.main_region.show(new NotFoundView);
                        App.navigate();
                        this.highlight_navi($(event.target).parent());
                }
            },


            switch_locale: function(event) {
                event.preventDefault();
                var locale = $(event.target).attr('href').replace('#', '');
                localStorage.setItem('locale', locale);
                document.location.reload(); // TODO: rerender current view instead of reloading
            },


            highlight_navi: function($elem) {
                $('#js-main-navi-items').find('li').removeClass('active');
                $elem.addClass('active');
            }
        });
    });

    return App.Common.MainNaviView;
});